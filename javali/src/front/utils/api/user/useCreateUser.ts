import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { User } from "../../types/user";
import { useUser } from "@/components/context/UserContext";

export const createUser = async (user: User) => {
  const res = await api("/api/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user, active: true }),
  });

  if (!res.ok) {
    throw new Error("Erro ao fazer o cadastro!");
  }

  return await res.json();
};

export const useCreateUser = (
  props?: UseMutationOptions<any, Error, User, unknown>
) => {
  const { login } = useUser();
  return useMutation({
    ...props,
    mutationKey: ["createUser"],
    mutationFn: createUser,
    onSuccess: (data, ...rest) => {
      props?.onSuccess?.(data, ...rest);

      login(data);
    },
  });
};
