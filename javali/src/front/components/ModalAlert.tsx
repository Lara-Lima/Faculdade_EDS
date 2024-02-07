import * as React from "react";
import { FC } from "react"; // Certifique-se de importar FC (Componente Funcional)
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type AlertDialogProps = {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  onConfirm?: () => void;
  titleModal: string;
  messageAlert: string;
};

export const ModalAlert: FC<AlertDialogProps> = ({
  open,
  setOpen,
  onConfirm,
  onClose,
  titleModal,
  messageAlert,
}) => {
  const handleClickOpen = () => {
    setOpen?.(true);
  };

  const handleClose = () => {
    setOpen?.(false);
    onClose?.();
  };
  const handleConfirm = () => {
    onConfirm?.();
    setOpen?.(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titleModal}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {messageAlert}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} autoFocus variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
