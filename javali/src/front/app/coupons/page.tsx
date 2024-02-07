"use client";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";
import { CardCoupon } from "./cardCoupon";
import { useReadMyCoupons } from "@/utils/api/cupom/useReadMyCoupon";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

type CouponsProps = {};

//TODO: cupons do USUÁRIO, que o usuário pode usar em suas compras
export const Coupons: FC<CouponsProps> = ({}) => {
  const { data, isLoading } = useReadMyCoupons();
  if (isLoading) {
    return (
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
    );
  }

  const dataCategory1 = data?.filter((coupon) => coupon?.categoria == 2);

  const activeCoupons = dataCategory1?.filter((coupon) => coupon.disponivel);

  const inactiveCoupons = dataCategory1?.filter((coupon) => !coupon.disponivel);

  return (
    <Box
      sx={{
        display: "grid",
        gap: "16px",
        padding: "16px",
        height: "86vh",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <Box
        sx={{
          borderRight: "1px solid #ccc",
          paddingRight: "16px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h3"
          sx={{ textAlign: "center", marginBottom: "16px" }}
        >
          Ativos
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
          }}
        >
          {activeCoupons?.map((coupon, key) => (
            <CardCoupon key={key} couponList={coupon} />
          ))}
        </Box>
        {!activeCoupons && (
          <Box
            sx={{
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              opacity: 0.35,
              alignContent: "center",
              justifyItems: "center",
            }}
          >
            <ConfirmationNumberIcon sx={{ fontSize: "120px" }} />
            <Typography>Não há cupons ativos para serem exibidos!</Typography>
          </Box>
        )}
      </Box>

      <Box>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", marginBottom: "16px" }}
        >
          Inativos
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {inactiveCoupons?.map((coupon, key) => (
            <CardCoupon key={key} couponList={coupon} />
          ))}
        </Box>
        {!inactiveCoupons && (
          <Box
            sx={{
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              opacity: 0.35,
              alignContent: "center",
              justifyItems: "center",
            }}
          >
            <ConfirmationNumberIcon sx={{ fontSize: "120px" }} />
            <Typography>Não há cupons inativos para serem exibidos!</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
