import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { User } from "../../types/user";
import { useUser } from "@/components/context/UserContext";
import z from "zod";

type UpdateUserProps = {
  userId: number;
};
export const inactiveUser = async ({ userId }: UpdateUserProps) => {
  const res = await api(`/api/user/inactive/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar o usuário!");
  }

  return true;
};

export const useInactiveUser = (
  props?: UseMutationOptions<any, Error, any, unknown>
) => {
  const { userIdStorage, logout } = useUser();
  return useMutation({
    ...props,
    mutationKey: ["inactiveUser"],
    mutationFn: (data) => inactiveUser({ userId: userIdStorage! }),
    onSuccess: (data, ...rest) => {
      props?.onSuccess?.(data, ...rest);
      logout();
    },
  });
};
