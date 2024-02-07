"use client";

import {
  Edit,
  AttachMoney,
  Delete,
  MapsHomeWork,
  Save,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  DatePickerElement,
  DateTimePickerElement,
  FormContainer,
  TextFieldElement,
  TimePickerElement,
} from "react-hook-form-mui";
import { useForm } from "react-hook-form";
import { Experience } from "@/utils/types/experience";
import { useUploadImage } from "@/utils/api/upload/useUploadImage";
import { useUpdateExperience } from "@/utils/api/experience/useUpdateExperience";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateExperience } from "@/utils/api/experience/useCreateExperience";
import { useUser } from "@/components/context/UserContext";
import { useDeleteExperience } from "@/utils/api/experience/useDeleteExperience";
import { ModalAlert } from "@/components/ModalAlert";
import { useQueryState } from "next-usequerystate";
import { Product } from "@/components/Product";
import { useReadMyExperiences } from "@/utils/api/experience/useReadMyExperience";
import { ProductExperience } from "@/components/ProductExperience";
import { DateField, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default function MyExperiences() {
  const queryClient = useQueryClient();
  const { data: dataExperience, isLoading } = useReadMyExperiences();
  const { mutateAsync: mutateAsyncUploadImage, isPending } = useUploadImage();

  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  const [experienceToDelete, setExperienceToDelete] = useState<number | null>(
    null
  );

  const { mutateAsync: mutateAsyncUpdateExperience } = useUpdateExperience({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readMyExperiences"],
      });
    },
  });

  const { mutateAsync: deleteExperience } = useDeleteExperience({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readMyExperiences"],
      });
      setExperienceToDelete(null);
    },
  });

  const handleCloseEditExperience = () => {
    setSelectedExperience(null);
  };

  const productExperience =
    dataExperience
      ?.slice()
      .reverse()
      .map((experience) => ({
        id: experience.experienceId,
        nome: experience.title,
        proprietario: experience.title,
        imagem:
          experience.images[0].url ||
          "https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

        data: `${experience.address.city} - ${experience.address.countryState}`,
        icon: (
          <IconButton onClick={() => setSelectedExperience(experience)}>
            <Edit />
          </IconButton>
        ),
        anotherIcon: (
          <IconButton
            onClick={() => setExperienceToDelete(experience.experienceId)}
          >
            <Delete />
          </IconButton>
        ),
      })) || [];

  const handleSubmit = async (data: Experience) => {
    await mutateAsyncUpdateExperience({
      experience: data,
      id: selectedExperience?.experienceId!,
    });
    handleCloseEditExperience();
  };

  const handleCloseDeleteExperience = () => {
    deleteExperience(experienceToDelete!);
    setExperienceToDelete(null);
  };

  const formContext = useForm<Experience>({});

  useEffect(() => {
    formContext.reset({
      ...selectedExperience,
      timeEnd: dayjs(selectedExperience?.timeEnd, "HH:mm:ss") as any,
      timeStart: dayjs(selectedExperience?.timeStart, "HH:mm:ss") as any,
    });
  }, [formContext, selectedExperience]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
          padding: "24px",
        }}
      >
        {isLoading && (
          <Box
            sx={{
              height: "66vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              opacity: 0.35,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {productExperience.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              padding: "24px",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "24px",
            }}
          >
            {productExperience?.map((produto, index) => (
              <ProductExperience
                key={index}
                proprietario={produto.proprietario}
                nome={produto.nome}
                imagem={produto.imagem}
                data={produto.data}
                icon={produto.icon}
                id={produto.id}
                anotherIcon={produto.anotherIcon}
              />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              opacity: 0.35,
            }}
          >
            <MapsHomeWork sx={{ fontSize: "120px" }} />
            <Typography>Não há experiências para serem exibidos!</Typography>
          </Box>
        )}
      </Box>

      <Dialog
        open={Boolean(selectedExperience)}
        onClose={handleCloseEditExperience}
        aria-labelledby="responsive-dialog-titl-e-ex"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Deseja editar a experiência?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormContainer onSuccess={handleSubmit} formContext={formContext}>
              <Box>
                <Box className="grid grid-cols-4 gap-2 p-4">
                  <TextFieldElement
                    name="title"
                    placeholder="Titulo"
                    label="Titulo"
                    className="col-span-2"
                  />
                  <TimePickerElement
                    name="timeStart"
                    label="Horário de Início"
                  />
                  <TimePickerElement
                    name="timeEnd"
                    label="Horário Encerramento"
                  />
                  <TextFieldElement
                    name="price"
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
                    name="description"
                    placeholder="Descricao"
                    label="Descricao"
                    className="col-span-4"
                    multiline
                    maxRows={4}
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
                                    experience:
                                      selectedExperience?.experienceId!,
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
                  <Button variant="outlined" color="primary">
                    Cancelar
                  </Button>

                  <Button variant="contained" type="submit" endIcon={<Save />}>
                    Editar informações
                  </Button>
                </Box>
              </Box>
            </FormContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      <ModalAlert
        open={Boolean(experienceToDelete)}
        onClose={() => setExperienceToDelete(null)}
        titleModal="Excluir Acomodação?"
        messageAlert="Tem certeza que deseja excluir a hospedagem?"
        onConfirm={handleCloseDeleteExperience}
      />
    </>
  );
}
