"use client";

import { useCreateAccommodation } from "@/utils/api/accommodation/useCreateAccommodation";
import { Accommodation } from "@/utils/types/accommodation";
import { AttachMoney, Save } from "@mui/icons-material";
import { Box, Button, InputAdornment, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import {
  TimePickerElement,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import { useUploadImage } from "@/utils/api/upload/useUploadImage";
import { useForm } from "react-hook-form";
import { useReadAddressByCEP } from "@/utils/api/address/useReadAddressByCEP";
import { useCallback, useEffect } from "react";

type Props = {
  onCreate?: () => void;
};
export default function AnnounceHosting({ onCreate }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync: mutateAsyncUploadImage, isPending } = useUploadImage();
  const { mutateAsync: createAccommodation } = useCreateAccommodation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readMyAccomodations"],
      });
    },
  });

  const handleCreateAccommodation = async (data: Accommodation) => {
    await createAccommodation(data);
    onCreate?.();
  };
  const formContext = useForm<Accommodation>({});
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

  useEffect(() => {
    handleFillCEP();
  }, [handleFillCEP]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          minHeight: "406px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
          display: "flex",
        }}
      >
        <Image src="/images/register1.png" width={400} height={660} alt={""} />

        <FormContainer
          onSuccess={handleCreateAccommodation}
          formContext={formContext}
        >
          <Box>
            <Box className="grid grid-cols-4 gap-2 p-4">
              <TextFieldElement
                name="title"
                placeholder="Titulo"
                label="Titulo"
                className="col-span-2"
              />

              <TimePickerElement name="checkIn" label="Horário Check IN" />
              <TimePickerElement name="checkOut" label="Horário Check Out" />
              <TextFieldElement
                name="description"
                placeholder="Descricao"
                label="Descricao"
                className="col-span-4"
                multiline
                maxRows={4}
              />

              <TextFieldElement
                name="rentPrice"
                placeholder="Valor Diária"
                label="Valor Diária"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />

              <TextFieldElement
                name="hostingArea"
                placeholder="Area"
                label="Area"
              />

              <TextFieldElement
                name="roomsQuantity"
                placeholder="Quantidade de Quartos"
                label="Quantidade de Quartos"
                type="number"
              />
              <TextFieldElement
                name="maxCapacity"
                placeholder="Capacidade máxima de Pessoas"
                label="Capacidade máxima de Pessoas"
                type="number"
              />
              <TextFieldElement
                name="bathroomsQuantity"
                placeholder="Quantidade de Banheiro"
                label="Quantidade de Banheiro"
                type="number"
              />

              <TextFieldElement
                name="address.cep"
                placeholder="Cep"
                label="CEP"
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
                type="number"
              />

              <TextFieldElement
                name="address.neighborhood"
                placeholder="bairro"
                label="bairro"
              />
              <TextFieldElement
                name="address.city"
                placeholder="Cidade"
                label="cidade"
              />
              <TextFieldElement
                name="address.countryState"
                placeholder="Cidade"
                label="cidade"
              />
              <Box
                sx={{
                  gridColumn: "1/-1",
                }}
              >
                {isPending ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <CircularProgress /> Fazendo upload...
                  </Box>
                ) : (
                  <>
                    <label htmlFor="images">Imagens</label>
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      onChange={async (event) => {
                        const data = await mutateAsyncUploadImage(
                          event.target.files as FileList
                        );
                        formContext.setValue(
                          "images",
                          data.map(
                            (image) =>
                              ({
                                url: image,
                              } as any)
                          )
                        );
                      }}
                    />
                  </>
                )}
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  {formContext.watch("images")?.map((image) => (
                    <img
                      key={image.url}
                      src={image.url}
                      alt={image.url}
                      width="100px"
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                gap: "16px",
                margin: "16px",
              }}
            >
              <Button variant="contained" type="submit" endIcon={<Save />}>
                Salvar
              </Button>
            </Box>
          </Box>
        </FormContainer>
      </Box>
    </Box>
  );
}
