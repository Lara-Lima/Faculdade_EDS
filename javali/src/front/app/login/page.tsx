"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoginUser } from "@/utils/api/user/useLoginUser";
import { useRouter } from "next/navigation";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import Image from "next/image";

const schema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Obrigatório" }),
});

export default function Login() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const { mutate, error, isPending } = useLoginUser({
    onError: (error) => {
      setOpen(true);
      setOpenErrorAlert(true);
    },
    onSuccess: () => {
      console.log("Login realizado com sucesso");
      router.push("/explorer");
    },
  });

  const formContext = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    mutate(data);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorAlert(false);
  };

  return (
    <FormContainer formContext={formContext} onSuccess={onSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
          }}
        >
          <Box
            sx={{
              padding: "24px",
              display: "grid",
              gap: "1rem",
              minWidth: "400px",
              justifyItems: "center",

              borderRadius: "16px",
            }}
          >
            <Image src="/images/login.png" width={600} height={440} alt={""} />

            <Image src="/logo.png" width={40} height={40} alt={""} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                alignItems: "center",
              }}
            >
              JAVAli
            </Typography>
            <TextFieldElement name="email" placeholder="Email" fullWidth />
            <TextFieldElement
              name="password"
              type="password"
              placeholder="Password"
              fullWidth
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button type="submit" variant="contained" disabled={isPending}>
                Entrar
                {isPending && (
                  <CircularProgress
                    className="ml-2"
                    size={20}
                    color="inherit"
                  />
                )}
              </Button>{" "}
              <span className="px-2">ou</span>{" "}
              <Link href="/register">
                {" "}
                <span className=" hover:underline underline-offset-2">
                  Cadastre-se agora!
                </span>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert severity="error">{error?.message}</Alert>
      </Snackbar>
    </FormContainer>
  );
}
