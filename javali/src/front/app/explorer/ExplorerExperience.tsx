"use client";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { EmojiEmotions, HomeWork, MapsHomeWork } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useReadExperiencesByDate } from "@/utils/api/experience/useReadExperiencesByDate";
import { useQueryState } from "next-usequerystate";
import { Accommodation } from "@/utils/types/accommodation";
import { useCart } from "@/components/context/CartContext";
import { Assessment } from "@/components/Assessment";
import { DetailsAccommodation } from "../details/detailsAccommodation";
import RangeDate from "@/components/RangeDate";
import { Product } from "@/components/Product";
import { ModalDetailsExperience } from "./ModalDetailsExperience";
import dayjs from "dayjs";

export function ExplorerExperience() {
  const { experiences, removeExperience } = useCart();
  const [date] = useQueryState("dateStart");

  const { data, refetch, isLoading } = useReadExperiencesByDate({
    date,
  });

  const experiencesData =
    data?.map((experience) => {
      return {
        id: experience.experienceId,
        nome: experience.title,
        proprietario: experience.title,
        imagem:
          experience.images[0].url ||
          "https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

        data: experience.date,
        cidade: experience.address?.city,
        estado: experience.address?.countryState,
        valor: `R$ ${experience.price}`,
        actionCard: <Assessment avaliacoes={experience.assessments} />,
      };
    }) || [];

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        padding: "24px",
      }}
    >
      <RangeDate
        onSearch={() => refetch()}
        dateStartOnly
        onClean={() => refetch()}
      />

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
      {experiencesData.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            padding: "24px",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "24px",
          }}
        >
          {experiencesData?.map((produto, index) => (
            <Product
              key={index}
              proprietario={produto.proprietario}
              nome={produto.nome}
              imagem={produto.imagem}
              data={produto.data}
              cidade={produto.cidade}
              estado={produto.estado}
              valor={produto.valor.toString()}
              id={produto.id}
              tabKey="experience"
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
          <Typography>Não há experiencias para serem exibidos!</Typography>
        </Box>
      )}
      <ModalDetailsExperience />
    </Box>
  );
}
