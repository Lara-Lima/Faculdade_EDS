"use client";

import { Feed } from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import {
  AddHomeWork,
  AddReaction,
  AccessTimeFilled,
  Edit,
  AttachMoney,
  Delete,
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
} from "@mui/material";
import { Filtro } from "../explorer/filtro";
import { AddProduct } from "./addProduct";
import { useEffect, useState } from "react";
import {
  DateTimePickerElement,
  FormContainer,
  TextFieldElement,
  TimePickerElement,
} from "react-hook-form-mui";
import { useForm } from "react-hook-form";
import { useReadMyAccomodations } from "@/utils/api/accommodation/useReadMyAccomodations";
import { Accommodation } from "@/utils/types/accommodation";
import { useUpdateAccommodation } from "@/utils/api/accommodation/useUpdateAccomodation";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateAccommodation } from "@/utils/api/accommodation/useCreateAccommodation";
import { useUser } from "@/components/context/UserContext";
import { useDeleteAccommodation } from "@/utils/api/accommodation/useDeleteAccommodation";
import { ModalAlert } from "@/components/ModalAlert";
import { useQueryState } from "next-usequerystate";
import { useReadMyExperiences } from "@/utils/api/experience/useReadMyExperience";
import { Experience } from "@/utils/types/experience";
import { useDeleteExperience } from "@/utils/api/experience/useDeleteExperience";
import { useCreateExperience } from "@/utils/api/experience/useCreateExperience";
import { useUpdateExperience } from "@/utils/api/experience/useUpdateExperience";
import { DetailsAccommodation } from "../details/detailsAccommodation";
import { DetailsExperience } from "../details/detailsExperience";

export default function ModalEditHosting() {
  const { user } = useUser();
  const [tab] = useQueryState("tab");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data: dataExperience } = useReadMyExperiences();
  const { data: dataAccomodation } = useReadMyAccomodations();

  const [selectedAccommodation, setSelectedAccommodation] =
    useState<Accommodation | null>(null);

  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  const [accommodationToDelete, setAccommodationToDelete] = useState<
    number | null
  >(null);

  const [experienceToDelete, setExperienceToDelete] = useState<number | null>(
    null
  );

  const { mutateAsync: mutateAsyncUpdateAccomodation } = useUpdateAccommodation(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["readMyAccomodations"],
        });
      },
    }
  );

  const { mutateAsync: mutateAsyncUpdateExperience } = useUpdateExperience({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readMyExperiences"],
      });
    },
  });

  const { mutateAsync: createAccommodation } = useCreateAccommodation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readMyAccomodations"],
      });
    },
  });

  const { mutateAsync: createExperience } = useCreateExperience({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readMyExperiences"],
      });
    },
  });

  const { mutateAsync: deleteAccommodation } = useDeleteAccommodation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readMyAccomodations"],
      });
      setAccommodationToDelete(null);
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

  const handleCloseEditAccomodation = () => {
    setSelectedAccommodation(null);
  };

  const handleCloseEditExperience = () => {
    setSelectedExperience(null);
  };

  const annouceItens = [
    {
      icon: <AddHomeWork />,
      text: "Minhas Hospedagenss",
      key: "accommodations",
    },
    {
      icon: <AddReaction />,
      text: "Minhas Experiências",
      key: "experiences",
    },
  ];

  const produtosAccommodation =
    dataAccomodation?.map((accommodation) => ({
      nome: accommodation.title,
      proprietario: accommodation.title,
      imagem:
        "https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

      data: accommodation.checkIn,
      icon: (
        <IconButton onClick={() => setSelectedAccommodation(accommodation)}>
          <Edit />
        </IconButton>
      ),
      anotherIcon: (
        <IconButton
          onClick={() => setAccommodationToDelete(accommodation.hostingId)}
        >
          <Delete />
        </IconButton>
      ),
      detailsProduct: <DetailsAccommodation accommodation={accommodation} />,
    })) || [];

  const produtosExperiences =
    dataExperience?.map((experience) => ({
      nome: experience.title,
      proprietario: user?.name,
      imagem:
        "https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

      data: experience.date,
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
      detailsProduct: <DetailsExperience experience={experience} />,
    })) || [];

  const handleSubmit = async (data: Accommodation) => {
    await mutateAsyncUpdateAccomodation({
      accommodation: data,
      id: selectedAccommodation?.hostingId!,
    });
    handleCloseEditAccomodation();
  };

  const handleCloseDeleteAccomodation = () => {
    deleteAccommodation(accommodationToDelete!);
    setAccommodationToDelete(null);
  };

  const handleSubmitExperience = async (data: Experience) => {
    await mutateAsyncUpdateExperience({
      experience: data,
      id: selectedExperience?.experienceId!,
    });
    handleCloseEditExperience();
  };

  const handleCreateAccommodation = async (data: Accommodation) => {
    createAccommodation(data);
    setOpen(false);
  };

  const handleCreateExperience = async (data: Experience) => {
    createExperience(data);
    setOpen(false);
  };

  const formContext = useForm<Accommodation>({});

  const formContextExperience = useForm<Experience>({});

  const defineProduct = () => {
    if (tab === "accommodations") {
      return produtosAccommodation;
    } else if (tab === "experiences") {
      return produtosExperiences;
    } else {
      return produtosAccommodation;
    }
  };

  useEffect(() => {
    formContext.reset({
      ...selectedAccommodation,
    });
  }, [formContext, selectedAccommodation]);

  useEffect(() => {
    formContextExperience.reset({
      ...selectedExperience,
    });
  }, [formContextExperience, selectedExperience]);

  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2.5fr 1fr" }}>
        <Sidebar
          listItems={annouceItens}
          hasButton
          modalTitle="Adicionar Produto"
          modalChildren={
            <AddProduct
              onSubmitAccomodation={handleCreateAccommodation}
              onSubmitExperience={handleCreateExperience}
            />
          }
          open={open}
          setOpen={setOpen}
        />
        <Feed produtos={defineProduct()} />
        <Filtro />
      </Box>

      <Dialog
        open={Boolean(selectedAccommodation)}
        onClose={handleCloseEditAccomodation}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Deseja editar a hospedagem?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormContainer onSuccess={handleSubmit} formContext={formContext}>
              <Box>
                <Box className="grid grid-cols-4 gap-2 p-4 w-max">
                  <TextFieldElement
                    name="title"
                    placeholder="Titulo"
                    label="Titulo"
                    className="col-span-2"
                  />
                  <TimePickerElement name="checkIn" label="Horário Check IN" />
                  <TimePickerElement
                    name="checkOut"
                    label="Horário Check Out"
                  />
                  <TextFieldElement
                    name="description"
                    placeholder="Descricao"
                    label="Descricao"
                    className="col-span-4"
                    multiline
                    maxRows={2}
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

                  {/* <TextFieldElement
                    name="endereco.rua"
                    placeholder="rua"
                    label="rua"
                    className="col-span-3"
                  />
                  <TextFieldElement
                    name="endereco.numero"
                    placeholder="numero"
                    label="numero"
                    type="number"
                  />
                  <TextFieldElement
                    name="endereco.bairro"
                    placeholder="bairro"
                    label="bairro"
                    className="col-span-2"
                  />
                  <TextFieldElement
                    name="endereco.cidade"
                    placeholder="cidade"
                    label="cidade"
                  /> */}
                </Box>
              </Box>
            </FormContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditAccomodation} variant="outlined">
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={() => formContext.handleSubmit(handleSubmit)()}
            autoFocus
            variant="contained"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(selectedExperience)}
        onClose={handleCloseEditExperience}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Deseja editar a experiência?"}
        </DialogTitle>
        <DialogContent>
          <FormContainer
            onSuccess={handleSubmitExperience}
            formContext={formContextExperience}
          >
            <Box>
              <Box className="grid grid-cols-4 gap-2 p-4 w-max">
                <TextFieldElement
                  name="title"
                  placeholder="Titulo"
                  label="Titulo"
                  className="col-span-2"
                />
                <DateTimePickerElement name="dateStart" label="Hora Inicio" />
                <DateTimePickerElement name="dateEnd" label="Hora Fim" />

                <TextFieldElement
                  name="description"
                  placeholder="Descricao"
                  label="Descricao"
                  className="col-span-4"
                  multiline
                  maxRows={2}
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

                {/* <TextFieldElement
                    name="endereco.bairro"
                    placeholder="bairro"
                    label="bairro"
                  />
                  <TextFieldElement
                    name="endereco.cidade"
                    placeholder="cidade"
                    label="cidade"
                  />

                  <TextFieldElement
                    name="endereco.rua"
                    placeholder="rua"
                    label="rua"
                    className="col-span-3"
                  />
                  <TextFieldElement
                    name="endereco.numero"
                    placeholder="numero"
                    label="numero"
                    type="number"
                  /> */}
              </Box>
            </Box>
          </FormContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditExperience} variant="outlined">
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={() =>
              formContextExperience.handleSubmit(handleSubmitExperience)()
            }
            autoFocus
            variant="contained"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <ModalAlert
        open={Boolean(accommodationToDelete)}
        onClose={() => setAccommodationToDelete(null)}
        titleModal="Excluir Acomodação?"
        messageAlert="Tem certeza que deseja excluir a hospedagem?"
        onConfirm={handleCloseDeleteAccomodation}
      />

      <ModalAlert
        open={Boolean(experienceToDelete)}
        onClose={() => setExperienceToDelete(null)}
        titleModal="Excluir Experiência?"
        messageAlert="Tem certeza que deseja excluir a experiencia?"
        onConfirm={() => deleteExperience(experienceToDelete!)}
      />
    </>
  );
}
