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
  FormContainer,
  TextFieldElement,
  TimePickerElement,
} from "react-hook-form-mui";
import { useForm } from "react-hook-form";
import { Accommodation } from "@/utils/types/accommodation";
import { useUpdateAccommodation } from "@/utils/api/accommodation/useUpdateAccomodation";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteAccommodation } from "@/utils/api/accommodation/useDeleteAccommodation";
import { ModalAlert } from "@/components/ModalAlert";
import { Product } from "@/components/Product";
import { useUploadImage } from "@/utils/api/upload/useUploadImage";
import { useReadMyCoupons } from "@/utils/api/cupom/useReadMyCoupon";
import { CardCoupon } from "@/app/coupons/cardCoupon";
import { useReadCouponByHosting } from "@/utils/api/cupom/useReadCouponByHosting";
import { useReadMyAccomodations } from "@/utils/api/accommodation/useReadMyAccomodations";
import dayjs from "dayjs";
import { useCreateHostingCoupon } from "@/utils/api/cupom/useCreateHostingCoupon";
import { Coupon } from "@/utils/types/coupon";

export default function MyHostings() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<Accommodation | null>(null);

  const { mutateAsync: createCoupon } = useCreateHostingCoupon({
    onSuccess: () => {
      if (selectedAccommodation) {
        queryClient.invalidateQueries({
          queryKey: ["readCouponByHosting", selectedAccommodation?.hostingId],
        });
      }
    },
  });

  const handleCreateHostingCoupon = async (data: Coupon) => {
    const hostingIdString = selectedAccommodation?.hostingId;

    if (hostingIdString !== undefined) {
      const hostingIdNumber = hostingIdString;

      if (!isNaN(hostingIdNumber)) {
        await createCoupon({
          hostingId: hostingIdString,
          coupon: data,
        });

        setOpen(false);
        alert("Cupom cadastrado com sucesso!");
      } else {
        console.error("A string não representa um número válido.");
      }
    } else {
      console.error("hostingId está indefinido.");
    }
  };

  const formContextCupom = useForm<Coupon>({});

  const { data: dataCupom } = useReadCouponByHosting({
    id: selectedAccommodation?.hostingId!,
    enabled: Boolean(selectedAccommodation),
  });

  const { data: dataAccomodation, isLoading } = useReadMyAccomodations();

  const [accommodationToDelete, setAccommodationToDelete] =
    useState<Accommodation | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const activeCoupons = dataCupom?.filter((coupon) => coupon.disponivel);

  const { mutateAsync: mutateAsyncUploadImage, isPending } = useUploadImage();
  const { mutateAsync: mutateAsyncUpdateAccomodation } = useUpdateAccommodation(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["readMyAccomodations"],
        });
      },
    }
  );

  const { mutateAsync: deleteAccommodation } = useDeleteAccommodation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readMyAccomodations"],
      });
      setAccommodationToDelete(null);
    },
  });

  const handleCloseEditAccomodation = () => {
    setSelectedAccommodation(null);
  };

  const productAccommodation =
    dataAccomodation?.map((accommodation) => ({
      id: accommodation.hostingId,
      nome: accommodation.title,
      proprietario: accommodation.title,
      imagem:
        accommodation.images.length > 0 ? accommodation.images[0].url : "",
      cidade: accommodation.address?.city,
      estado: accommodation.address?.countryState,
      valor: `R$ ${accommodation.rentPrice},00`,

      data: accommodation.checkIn,
      icon: (
        <IconButton onClick={() => setSelectedAccommodation(accommodation)}>
          <Edit />
        </IconButton>
      ),
      anotherIcon: (
        <IconButton onClick={() => setAccommodationToDelete(accommodation)}>
          <Delete />
        </IconButton>
      ),
    })) || [];

  const handleSubmit = async (data: Accommodation) => {
    await mutateAsyncUpdateAccomodation({
      accommodation: data,
      id: selectedAccommodation?.hostingId!,
    });
    handleCloseEditAccomodation();
  };

  const handleCloseDeleteAccomodation = () => {
    deleteAccommodation(accommodationToDelete?.hostingId!);
    setAccommodationToDelete(null);
  };

  const formContext = useForm<Accommodation>({});

  const hasActiveCoupons = (activeCoupons?.length || 0) > 0;

  useEffect(() => {
    formContext.reset({
      ...selectedAccommodation,
      checkIn: dayjs(selectedAccommodation?.checkIn, "HH:mm:ss") as any,
      checkOut: dayjs(selectedAccommodation?.checkOut, "HH:mm:ss") as any,
    });
  }, [formContext, selectedAccommodation]);

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
        {productAccommodation.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              padding: "24px",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "24px",
            }}
          >
            {productAccommodation?.map((produto, index) => (
              <Product
                key={index}
                proprietario={produto.proprietario}
                nome={produto.nome}
                imagem={produto.imagem}
                data={produto.data}
                icon={produto.icon}
                id={produto.id}
                anotherIcon={produto.anotherIcon}
                cidade={produto.cidade}
                estado={produto.estado}
                valor={produto.valor.toString()}
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
            <Typography>Não há hospedagens para serem exibidas!</Typography>
          </Box>
        )}
      </Box>

      <Dialog
        open={Boolean(selectedAccommodation)}
        onClose={handleCloseEditAccomodation}
        aria-labelledby="modal-details-hosting"
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
                <Box className="grid grid-cols-4 gap-2 p-4">
                  <TextFieldElement
                    name="title"
                    placeholder="Titulo"
                    label="Titulo"
                    className="col-span-2"
                  />

                  <TimePickerElement name="checkIn" label="Check IN" />
                  <TimePickerElement name="checkOut" label="Check Out" />
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
                    placeholder="cidade"
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

                  <Box>
                    <Typography variant="h5">Cupom</Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      {dataCupom
                        ?.sort((a, b) => {
                          if (a.disponivel && !b.disponivel) {
                            return -1;
                          }
                          if (!a.disponivel && b.disponivel) {
                            return 1;
                          }
                          return 0;
                        })
                        ?.map((coupon, key) => (
                          <CardCoupon
                            key={key}
                            couponList={coupon}
                            hostingId={selectedAccommodation?.hostingId}
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
                  {!hasActiveCoupons && (
                    <Button
                      onClick={() => setOpen(true)}
                      variant="outlined"
                      color="secondary"
                    >
                      Criar Cupom Para suas Hospedagens
                    </Button>
                  )}
                  <Box marginBottom={5}></Box>
                  <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Cadastrar Cupom</DialogTitle>
                    <DialogContent>
                      <FormContainer
                        onSuccess={handleCreateHostingCoupon}
                        formContext={formContextCupom}
                      >
                        <Box marginBottom={2} marginTop={4}>
                          <TextFieldElement
                            name="titulo"
                            placeholder="Titulo"
                            label="Titulo"
                          />
                        </Box>
                        <Box marginBottom={2}>
                          <TextFieldElement
                            name="codDoCupom"
                            placeholder="Código Cupom"
                            label="Código Cupom"
                          />
                        </Box>
                        <Box marginBottom={2}>
                          <TextFieldElement
                            name="desconto"
                            placeholder="desconto"
                            label="Desconto em %"
                          />
                        </Box>
                      </FormContainer>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpen(false)} variant="outlined">
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        onClick={() =>
                          formContextCupom.handleSubmit(
                            handleCreateHostingCoupon
                          )()
                        }
                        autoFocus
                        variant="contained"
                      >
                        Confirmar
                      </Button>
                    </DialogActions>
                  </Dialog>
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
        open={Boolean(accommodationToDelete)}
        onClose={() => setAccommodationToDelete(null)}
        titleModal="Excluir Acomodação?"
        messageAlert="Tem certeza que deseja excluir a hospedagem?"
        onConfirm={handleCloseDeleteAccomodation}
      />
    </>
  );
}
