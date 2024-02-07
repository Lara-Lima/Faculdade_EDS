import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Experience } from "@/utils/types/experience";

export const uploadImage = async (
  fileList: FileList,
) => {
  const formData = new FormData();
  Array.from(fileList).forEach((file) => {
    formData.append("files", file);
  }
  );
  const res = await api(`/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao fazer upload!");
  }

  return (await res.json()) as string[];
};

export const useUploadImage = (
  props?: UseMutationOptions<any, Error, FileList, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["uploadImage"],
    mutationFn: uploadImage,
  });
};
