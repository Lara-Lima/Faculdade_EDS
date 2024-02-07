import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { api } from "../api";
import { User } from "../../types/user";
import { useUser } from "@/components/context/UserContext";

type LoginUser = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginUser) => {
  const res = await api(`/api/user/login/${email}`, {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao fazer o login!");
  }

  const userDetails = await res.json();

  if (!userDetails) {
    throw new Error("Usuário não encontrado!");
  }

  if (!userDetails.active) {
    throw new Error("Usuário inativo!");
  }

  if (userDetails.password !== password) {
    throw new Error("Senha inválida");
  }

  return userDetails;
};

export const useLoginUser = (
  props?: UseMutationOptions<any, Error, LoginUser, unknown>
) => {
  const { login } = useUser();
  return useMutation({
    ...props,
    mutationKey: ["loginUser"],
    mutationFn: loginUser,
    onSuccess: (data, ...rest) => {
      props?.onSuccess?.(data, ...rest);
      login(data);
    },
  });
};
