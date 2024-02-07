import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { User } from "../../types/user";
import { useUser } from "@/components/context/UserContext";
import z from "zod";

export const updateUserSchema = z.object({
  name: z.string({ required_error: "Obrigatório" }),
  birthDate: z.coerce.date({
    invalid_type_error: "Obrigatório",
    required_error: "Obrigatório",
  }),
  address: z.object({
    street: z.string({ required_error: "Obrigatório" }),
    addressNumber: z.number({ required_error: "Obrigatório" }),
    city: z.string({ required_error: "Obrigatório" }),
    countryState: z.string({ required_error: "Obrigatório" }),
    neighborhood: z.string({ required_error: "Obrigatório" }),
    cep: z.string({ required_error: "Obrigatório" }),
  }),
  phone: z.string({ required_error: "Obrigatório" }),
});

type UpdateUserProps = {
  userId: number;
  user: z.infer<typeof updateUserSchema>;
};
export const updateUser = async ({ user, userId }: UpdateUserProps) => {
  const res = await api(`/api/user/update/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...user,
    }),
  });

  //   if (!res.ok) {
  //     throw new Error("Erro ao atualizar o usuário!");
  //   }

  return user;
};

export const useUpdateUser = (
  props?: UseMutationOptions<
    any,
    Error,
    z.infer<typeof updateUserSchema>,
    unknown
  >
) => {
  const { userIdStorage } = useUser();
  return useMutation({
    ...props,
    mutationKey: ["updateUser"],
    mutationFn: (data) => updateUser({ user: data, userId: userIdStorage! }),
  });
};
