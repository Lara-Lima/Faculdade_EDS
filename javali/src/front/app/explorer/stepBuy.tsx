import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useCreateBuy } from "@/utils/api/buy/useCreateBuy";
import { useCart } from "@/components/context/CartContext";

type StepProps = {
  steps: StepItem[];
  closeModal: () => void;
};

type StepItem = {
  label: string;
  description?: string;
  reactNode?: React.ReactNode;
};

export const StepBuy: React.FC<StepProps> = ({ steps, closeModal }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { mutateAsync } = useCreateBuy();
  const { accommodations, experiences, clearCart, appliedCoupon } = useCart();

  const handleNext = (isLastStep: boolean) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (isLastStep) {
      mutateAsync({
        ...(accommodations.length > 0 && { accommodation: accommodations }),
        ...(experiences.length > 0 && { experience: experiences }),
        ...(appliedCoupon && { cupom: appliedCoupon }),
      });
      clearCart();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.reactNode}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    variant="outlined"
                  >
                    Voltar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleNext(index === steps.length - 1)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1
                      ? "Concluir Reserva"
                      : "Continuar"}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Pagamento Concluido!</Typography>

          <Button onClick={closeModal} sx={{ mt: 1, mr: 1 }} variant="outlined">
            Fechar Modal
          </Button>
        </Paper>
      )}
    </Box>
  );
};
