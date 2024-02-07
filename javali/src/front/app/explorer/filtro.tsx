import { Box, TextField, Typography } from "@mui/material";
import React, { FC } from "react";

export const Filtro: FC = () => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed" width={300}>
        <Typography variant="h4" fontWeight={100} mt={2} mb={2}>
          Filtro
        </Typography>
        <Box sx={{ display: "grid", gap: "16px" }}>
          <TextField label="Bairro" id="bairrol" />
          <TextField label="Cidade" id="cidade" />

          <Box sx={{ display: "flex", gap: "16px" }}>
            <TextField label="Valor Minimo" id="minimo" />
            <TextField label="Valor Máximo" id="maximo" />
          </Box>

          <TextField label="Ordenar Por avaliação" id="avaliacao" />
        </Box>
      </Box>
    </Box>
  );
};
