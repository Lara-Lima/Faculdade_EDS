import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { useCart } from "@/components/context/CartContext";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
import { checkCoupon, useCheckCoupon } from "@/utils/api/cupom/useCheckCoupon";
import { Coupon } from "@/utils/types/coupon";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ContainerPix() {
  const [cupom, setCupom] = React.useState<string>("");
  const [cupomInvalido, setCupomInvalido] = React.useState<boolean>(false);
  const [cupomValido, setCupomValido] = React.useState<boolean>(false);
  const {
    accommodations,
    experiences,
    setAppliedCoupon,
    total,
    subtotal,
    appliedCoupon,
    removeAccommodation,
    removeExperience,
  } = useCart();

  const { data, refetch, isLoading } = useCheckCoupon({
    code: cupom,
    enabled: false,
  });

  const handleAplicarCupom = async () => {
    const response = await refetch();
    if (response.data) {
      setAppliedCoupon(response.data);
      setCupomValido(true);
    } else {
      setCupomInvalido(true);
    }
    // try {
    //   setAppliedCoupon(await checkCoupon(cupom));
    //   setCupomValido(true);
    // } catch (e) {
    //   setCupomInvalido(true);
    // }
  };

  return (
    <Box>
      {appliedCoupon && (
        <>
          <div>Desconto: {appliedCoupon?.desconto}%</div>
          <div>Subtotal: {subtotal}</div>
          <div>Cupom aplicado: {appliedCoupon.codDoCupom}</div>
        </>
      )}
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Box>
          {" "}
          <div>Total: {total}</div>
          <div className="flex">
            <TextField
              placeholder="Cupom"
              label="Cupom"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
            />
            <Button onClick={handleAplicarCupom} disabled={isLoading}>
              Aplicar {isLoading && <CircularProgress />}
            </Button>
          </div>
        </Box>
      </Box>
      <Snackbar
        open={cupomInvalido}
        autoHideDuration={6000}
        onClose={() => setCupomInvalido(false)}
      >
        <Alert severity="error">Cupom Inválido!</Alert>
      </Snackbar>
      <Snackbar
        open={cupomValido}
        autoHideDuration={6000}
        onClose={() => setCupomValido(false)}
      >
        <Alert severity="success">Cupom Aplicado com Success!</Alert>
      </Snackbar>
    </Box>
  );
}
