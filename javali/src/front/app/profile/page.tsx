"use client";

import { useUser } from "@/components/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  DatePickerElement,
  FormContainer,
  MultiSelectElement,
  TextFieldElement,
} from "react-hook-form-mui";
import * as z from "zod";
import dayjs from "dayjs";
import {
  updateUserSchema,
  useUpdateUser,
} from "@/utils/api/user/useUpdateUser";
import { useEffect, useState } from "react";
import IconNameUser from "@/components/IconNameUser";
import { useInactiveUser } from "@/utils/api/user/useInactiveUser";
import { Save } from "@mui/icons-material";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Profile() {
  const { user } = useUser();
  const { mutateAsync } = useUpdateUser({
    onSuccess: () => {
      window.location.reload();
      alert("Dados atualizados com sucesso!");
    },
  });
  const { mutateAsync: mutateAsyncInactiveUser } = useInactiveUser();

  const [openInativar, setOpenInativar] = useState(false);

  const formContext = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      ...user,
      birthDate: dayjs(user?.birthDate) as unknown as Date,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateUserSchema>> = (data) =>
    mutateAsync(data);

  const handleConfirm = () => {
    mutateAsyncInactiveUser({});
    handleCloseInativar();
  };

  useEffect(() => {
    formContext.reset({
      ...user,
      birthDate: dayjs(user?.birthDate) as unknown as Date,
    });
  }, [formContext, user]);

  const handleCloseInativar = () => {
    setOpenInativar(false);
  };
  const handleConfirmInativar = () => {
    user;
    setOpenInativar(true);
  };

  return (
    <>
      <Navbar />
      <Box>
        <Box className=" p-6 flex justify-center items-center flex-col">
          <Paper
            elevation={3}
            className="flex justify-center items-center direction-column gap-8 p-4 "
          >
            <Image
              src="/images/profile.png"
              width={360}
              height={360}
              alt={""}
            />

            <FormContainer onSuccess={onSubmit} formContext={formContext}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <IconNameUser userName={user?.name} tam={120} />
              </Box>
              <div className="grid gap-4  grid-cols-2   p-4 mb-2">
                <TextFieldElement
                  name="name"
                  placeholder="Nome"
                  label="Nome"
                  sx={{ gridColumn: "span 2" }}
                />
                <DatePickerElement
                  name="birthDate"
                  label="Data de Nascimento"
                />
                <TextFieldElement
                  name="email"
                  placeholder="Email"
                  label="Email"
                  fullWidth
                  disabled
                />
                <TextFieldElement
                  name="socialId"
                  placeholder="cpf"
                  label="cpf"
                  disabled
                />

                <TextFieldElement
                  name="address.cep"
                  placeholder="cep"
                  label="cep"
                />

                <TextFieldElement
                  name="address.street"
                  placeholder="rua"
                  label="rua"
                  sx={{ gridColumn: "span 2" }}
                />
                <TextFieldElement
                  name="address.addressNumber"
                  placeholder="numero"
                  label="numero"
                />
                <TextFieldElement
                  name="address.neighborhood"
                  placeholder="bairro"
                  label="bairro"
                />
                <TextFieldElement
                  name="address.city"
                  placeholder="cidade"
                  label="cidade"
                />
                <TextFieldElement
                  name="address.countryState"
                  placeholder="estado"
                  label="estado"
                />
              </div>
              <Box className="flex justify-between mt-6">
                <Button
                  variant="outlined"
                  type="button"
                  onClick={handleConfirmInativar}
                >
                  Inativar Conta
                </Button>
                <Button variant="contained" type="submit" endIcon={<Save />}>
                  Salvar
                </Button>
              </Box>
            </FormContainer>

            <Dialog
              open={openInativar}
              onClose={handleCloseInativar}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Inativar Conta</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Tem certeza que deseja inativar sua conta?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseInativar} variant="outlined">
                  Cancelar
                </Button>
                <Button onClick={handleConfirm} autoFocus variant="contained">
                  Inativar Conta
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
