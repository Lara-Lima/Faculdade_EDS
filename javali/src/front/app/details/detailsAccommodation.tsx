import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";
import { Accommodation } from "@/utils/types/accommodation";
import { FC, useState } from "react";
import {
  AirlineSeatLegroomNormal,
  Assessment,
  Bed,
  Crop,
  Groups,
} from "@mui/icons-material";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { createCoupon } from "@/utils/api/cupom/useCreateCoupon";
import { Coupon } from "@/utils/types/coupon";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateHostingCoupon } from "@/utils/api/cupom/useCreateHostingCoupon";

type DetailsAccommodationProps = {
  accommodation: Accommodation;
};

export const DetailsAccommodation: FC<DetailsAccommodationProps> = ({
  accommodation,
}) => {
  const teste = false;
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const [hostingId, setHostingId] = useState<number>(Number);

  const { mutateAsync: createCoupon } = useCreateHostingCoupon({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readMyCoupons"],
      });
    },
  });

  const handleCreateCoupon = async (data: Coupon) => {
    await createCoupon({
      hostingId: hostingId,
      coupon: data,
    });
    setOpen(false);
  };
  const formContext = useForm<Coupon>({});

  return (
    <Box>
      <Typography variant="h4">Esse lugar oferece</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "16px",
        }}
      >
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Crop />{" "}
          <Typography variant="h6">{accommodation.hostingArea} m²</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Groups />
          <Typography variant="h6">
            Suporta {accommodation.maxCapacity} pessoas
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Bed />{" "}
          <Typography variant="h6">
            {accommodation.roomsQuantity} quartos
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <AirlineSeatLegroomNormal />{" "}
          <Typography variant="h6">
            {accommodation.bathroomsQuantity > 1
              ? `${accommodation.bathroomsQuantity} banheiro`
              : `${accommodation.bathroomsQuantity} banheiros`}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h4" marginTop={"24px"} marginBottom={"12px"}>
        Descrição
      </Typography>

      <Typography variant="caption">{accommodation.description}</Typography>
      <Typography variant="h4" marginTop={"24px"} marginBottom={"50px"}>
        Avaliações
      </Typography>
      <Button
        type="submit"
        variant="contained"
        color="success"
        onClick={() => {
          setHostingId(accommodation.hostingId);
          setOpen(true);
        }}
      >
        Cadastrar Cupom
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Cadastrar Cupom</DialogTitle>
        <DialogContent>
          <FormContainer
            onSuccess={handleCreateCoupon}
            formContext={formContext}
          >
            <Box marginBottom={2} marginTop={4}>
              <TextFieldElement
                name="titulo"
                placeholder="Titulo"
                label="Titulo"
              />
            </Box>
            <Box marginBottom={2}>
              <TextFieldElement
                name="codDoCupom"
                placeholder="Código Cupom"
                label="Código Cupom"
              />
            </Box>
            <Box marginBottom={2}>
              <TextFieldElement
                name="desconto"
                placeholder="desconto"
                label="Valor Desconto"
              />
            </Box>
          </FormContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={() => formContext.handleSubmit(handleCreateCoupon)()}
            autoFocus
            variant="contained"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      {accommodation.assessments?.map((assessment, key) => (
        <Box key={key} marginBottom={2}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            {/* <Typography variant="h6">{assessment.userAssessment}</Typography> */}
            <Rating
              value={assessment.scoreAssessment}
              readOnly
              precision={1}
              size="small"
            />
          </Box>

          {assessment.descriptionAssessment && (
            <Typography variant="subtitle1">
              {assessment.descriptionAssessment}
            </Typography>
          )}
        </Box>
      ))}
      <Typography variant="h4" marginTop={4} color={"secondary"}>
        {teste ? "Cupons sugeridos" : "Sem cupons"}
      </Typography>
    </Box>
  );
};
