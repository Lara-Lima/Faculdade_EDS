"use client";

import { useReadAddressByCEP } from "@/utils/api/address/useReadAddressByCEP";
import { useCreateUser } from "@/utils/api/user/useCreateUser";
import { User } from "@/utils/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  DatePickerElement,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import * as z from "zod";

const schema = z
  .object({
    name: z.string({ required_error: "Obrigatório" }),
    birthDate: z.coerce.date({
      invalid_type_error: "Obrigatório",
      required_error: "Obrigatório",
    }),
    address: z.object({
      cep: z.string({ required_error: "Obrigatório" }),
      street: z.string({ required_error: "Obrigatório" }),
      addressNumber: z.string({ required_error: "Obrigatório" }),
      neighborhood: z.string({ required_error: "Obrigatório" }),
      city: z.string({ required_error: "Obrigatório" }),
      countryState: z.string({ required_error: "Obrigatório" }),
    }),
    phone: z.string({ required_error: "Obrigatório" }),
    password: z.string({ required_error: "Obrigatório" }),
    confirmPassword: z.string({ required_error: "Obrigatório" }),
    email: z.string().email({ message: "Email inválido" }),
    socialId: z.string({ required_error: "Obrigatório" }),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const router = useRouter();

  const formContext = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useCreateUser({
    onError: (error) => {
      console.error(error.message);
    },
    onSuccess: () => {
      console.log("Cadastro realizado com sucesso");
      router.push("/explorer");
    },
  });

  const cepForm = formContext.watch("address.cep");

  const { refetch } = useReadAddressByCEP(cepForm as unknown as string, {
    queryKey: ["readAddress"],
    enabled: false,
  });

  const handleFillCEP = useCallback(async () => {
    if (cepForm?.length === 8) {
      const { data } = await refetch();
      formContext.setValue("address.street", data?.street || "");
      formContext.setValue("address.neighborhood", data?.neighborhood || "");
      formContext.setValue("address.city", data?.city || "");
      formContext.setValue("address.countryState", data?.countryState || "");
    }
  }, [cepForm?.length, formContext, refetch]);

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    mutate(data);
  };

  useEffect(() => {
    handleFillCEP();
  }, [handleFillCEP]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormContainer onSuccess={onSubmit} formContext={formContext}>
        <Box
          sx={{
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyItems: "center",
          }}
        >
          <Image
            src="/images/register1.png"
            width={600}
            height={440}
            alt={""}
          />
          <Box
            sx={{
              display: "grid",
              justifyItems: "center",
            }}
          >
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
            <Box className="grid grid-cols-2 gap-2 p-4">
              <TextFieldElement name="name" placeholder="Nome" label="Nome" />
              <DatePickerElement name="birthDate" label="Data de Nascimento" />
              <TextFieldElement name="socialId" placeholder="cpf" label="cpf" />
              <TextFieldElement
                name="phone"
                placeholder="telefone"
                label="telefone"
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
              />
              <TextFieldElement
                name="address.addressNumber"
                placeholder="numero"
                label="numero"
              />
              {
                <TextFieldElement
                  name="address.neighborhood"
                  placeholder="bairro"
                  label="bairro"
                />
              }
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
              <TextFieldElement
                name="email"
                placeholder="Email"
                label="Email"
              />
              <TextFieldElement
                name="password"
                type="password"
                label="Senha"
                placeholder="Senha"
              />
              <TextFieldElement
                name="confirmPassword"
                type="password"
                label="Confirmar Senha"
                placeholder="Confirmar Senha"
              />
            </Box>
            <Box>
              <Button variant="contained" type="submit">
                Cadastrar
              </Button>{" "}
              Já tem uma conta?{" "}
              <Link href="/login">
                {" "}
                <span className=" hover:underline underline-offset-2">
                  Entrar
                </span>
              </Link>
            </Box>
          </Box>
        </Box>
      </FormContainer>
    </Box>
  );
}
