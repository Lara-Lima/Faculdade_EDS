"use client";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Alert, Box, Button, Paper, Snackbar } from "@mui/material";
import { FC } from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ClipboardJS from "clipboard";
import { useInactiveCoupon } from "@/utils/api/cupom/useInactiveCoupon";
import Navbar from "@/components/Navbar";
import { useUser } from "@/components/context/UserContext";
import { Coupons } from "../coupons/page";
import { Coupon } from "@/utils/types/coupon";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

type CardCouponProps = { couponList: Coupon; hostingId?: number };

export const CardCoupon: FC<CardCouponProps> = ({ couponList, hostingId }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: mutateAsyncInactive } = useInactiveCoupon({
    onSuccess: () => {
      if (hostingId) {
        queryClient.invalidateQueries({
          queryKey: ["readCouponByHosting", hostingId],
        });
      }
    },
  });

  const handleConfirm = async () => {
    await mutateAsyncInactive(couponList?.cupomId);
    reloadComponent();
    // window.location.reload();
  };

  const handleCopyCouponCode = () => {
    const clipboard = new ClipboardJS(".copy-button", {
      text: () => couponList.codDoCupom,
    });

    clipboard.on("success", function (e) {
      e.clearSelection();
      clipboard.destroy();
      setOpenSnackbar(true);
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const reloadComponent = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    console.log("Componente recarregado");
  }, [reloadKey]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        opacity: couponList.disponivel ? 1 : 0.6,
      }}
    >
      <Box
        sx={{
          padding: "16px",
          borderRadius: "50%",
          backgroundColor: "#242a6b",
        }}
      >
        <ConfirmationNumberIcon
          color={couponList.hostingId ? "error" : "secondary"}
          sx={{ fontSize: "60px" }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          minWidth: "360px",
        }}
      >
        <Typography variant="caption">
          Código: {couponList.codDoCupom}
        </Typography>
        <Typography variant="h3">{couponList.titulo}</Typography>

        <Typography variant="h6">Desconto de {couponList.desconto}%</Typography>
        {couponList.disponivel && (
          <>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Button
                variant="outlined"
                onClick={handleCopyCouponCode}
                className="copy-button"
              >
                Copiar código
              </Button>

              {couponList?.categoria == 1 && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleConfirm}
                  className="copy-button"
                >
                  Inativar
                </Button>
              )}
            </Box>
            {couponList?.categoria == 1 && (
              <Typography variant="caption">
                Expira em:{" "}
                {dayjs(couponList.dataExpiracao).format("DD/MM/YYYY")}
              </Typography>
            )}
          </>
        )}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success">Copiado com sucesso!</Alert>
      </Snackbar>
    </Paper>
  );
};
