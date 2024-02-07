"use client";
import { MapsHomeWork } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useReadExplorerAccomodationsByDays } from "@/utils/api/accommodation/useReadExplorerAccomodationsByDays";
import { useQueryState } from "next-usequerystate";
import { Accommodation } from "@/utils/types/accommodation";
import { Assessment } from "@/components/Assessment";
import { DetailsAccommodation } from "../details/detailsAccommodation";
import RangeDate from "@/components/RangeDate";
import { Product } from "@/components/Product";
import dayjs from "dayjs";
import ModalDetailsAccomodation from "./ModalDetailsAccomodation";

export const valorProduct = (
  dataAccommodation: Accommodation,
  totalDays: number = 1
) => {
  const valorInicial = dataAccommodation.rentPrice * totalDays;
  const totalDeCuopons = dataAccommodation.cupons?.length || 0;
  const cupom = dataAccommodation?.cupons?.find((cupom) => cupom.disponivel);
  if (totalDeCuopons > 0 && cupom) {
    const valorDesconto = cupom?.desconto;
    const valorFinal =
      valorInicial - (valorInicial * (valorDesconto || 0)) / 100;

    return `R$ ${valorInicial},00 - ${valorDesconto}% = R$ ${valorFinal}`;
  }
  return `R$ ${valorInicial},00 `;
};

export default function ExplorerHosting() {
  const [dateStart] = useQueryState("dateStart");
  const [dateEnd] = useQueryState("dateEnd");

  const {
    data: dataAccommodation,
    refetch,
    isLoading,
  } = useReadExplorerAccomodationsByDays({
    ...(dateStart && {
      dateStart: dayjs(dateStart).format("YYYY-MM-DD"),
    }),
    ...(dateEnd && {
      dateEnd: dayjs(dateEnd).format("YYYY-MM-DD"),
    }),
  });

  const productAccommodation =
    dataAccommodation?.map((accommodation) => {
      return {
        id: accommodation.hostingId,
        nome: accommodation.title,
        proprietario: accommodation.title,
        city: accommodation.address?.city,
        countryState: accommodation.address?.countryState,
        imagem:
          accommodation.images[0].url ||
          "https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

        valor: valorProduct(accommodation),
        actionCard: <Assessment avaliacoes={accommodation.assessments} />,
        detailsProduct: <DetailsAccommodation accommodation={accommodation} />,
      };
    }) || [];

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",

        padding: "24px",
      }}
    >
      <RangeDate onSearch={() => refetch()} onClean={() => refetch()} />
      {isLoading && (
        <Box
          sx={{
            height: "66vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            opacity: 0.35,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {productAccommodation.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            padding: "24px",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "24px",
          }}
        >
          {productAccommodation?.map((produto, index) => (
            <Product
              key={index}
              proprietario={produto.proprietario}
              nome={produto.nome}
              imagem={produto.imagem}
              cidade={produto.city}
              estado={produto.countryState}
              valor={produto.valor}
              detailsProduct={produto.detailsProduct}
              id={produto.id}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            height: "66vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            opacity: 0.35,
          }}
        >
          <MapsHomeWork sx={{ fontSize: "120px" }} />
          <Typography>Não há hospedagens para serem exibidas!</Typography>
        </Box>
      )}
      <ModalDetailsAccomodation />
    </Box>
  );
}
