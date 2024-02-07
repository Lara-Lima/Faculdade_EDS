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
} from "@mui/material";
import { checkCoupon } from "@/utils/api/cupom/useCheckCoupon";
import { Coupon } from "@/utils/types/coupon";
import DeleteIcon from "@mui/icons-material/Delete";
import { valorProduct } from "./ExplorerHosting";
import dayjs from "dayjs";

export default function CheckboxListBuy() {
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

  const handleAplicarCupom = async () => {
    try {
      setAppliedCoupon(await checkCoupon(cupom));
      setCupomValido(true);
    } catch (e) {
      setCupomInvalido(true);
    }
  };

  return (
    <>
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {accommodations.map(({ accommodation, dateEnd, dateStart }) => {
          const labelId = `checkbox-list-secondary-label-${accommodation.hostingId}`;
          const totalDays = dayjs(dateEnd).diff(dateStart, "day");
          return (
            <ListItem
              key={accommodation.hostingId}
              disablePadding
              secondaryAction={
                <IconButton
                  onClick={() => removeAccommodation(accommodation.hostingId)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                id={labelId}
                primary={`${accommodation.title} ${valorProduct(
                  accommodation,
                  totalDays
                )}`}
              />
            </ListItem>
          );
        })}
        {experiences.map(({ experience }) => {
          const labelId = `checkbox-list-secondary-label-${experience.experienceId}`;
          return (
            <ListItem
              key={experience.experienceId}
              secondaryAction={
                <IconButton
                  onClick={() => removeExperience(experience.experienceId)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText id={labelId} primary={`${experience.title}`} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
