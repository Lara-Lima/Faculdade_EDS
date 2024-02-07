"use client";

import { AttachMoney } from "@mui/icons-material";
import { Box, Button, InputAdornment, Tab, Tabs } from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
  DateTimePickerElement,
  FormContainer,
  TextFieldElement,
  TimePickerElement,
  useForm,
} from "react-hook-form-mui";
import { Accommodation } from "@/utils/types/accommodation";
import { Experience } from "@/utils/types/experience";
import { useReadAddressByCEP } from "@/utils/api/address/useReadAddressByCEP";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box className="flex space-between">{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type AddProductProps = {
  onSubmitAccomodation(accommodation: Accommodation): void;
  onSubmitExperience(experience: Experience): void;
};

export const AddProduct: FC<AddProductProps> = ({
  onSubmitAccomodation,
  onSubmitExperience,
}) => {
  const [value, setValue] = useState(0);
  const [cep, setCep] = useState("31620680");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const form = useForm<Accommodation>();
  const cepForm = form.watch("address.cep");
  const { data, refetch } = useReadAddressByCEP(cepForm as unknown as string, {
    queryKey: ["readAddress"],
    enabled: false,
  });

  const handleFillCEP = useCallback(async () => {
    if (cepForm?.length === 8 && data) {
      await refetch();
      form.setValue("address.street", data?.street);
      form.setValue("address.neighborhood", data?.neighborhood);
      form.setValue("address.city", data?.city);
      form.setValue("address.countryState", data?.countryState);
    }
  }, [cepForm?.length, data, form, refetch]);

  useEffect(() => {
    handleFillCEP();
  }, [handleFillCEP]);

  return (
    <Box>
      <div className="flex justify-center items-center flex-col">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Adicionar Hospedagem" {...a11yProps(0)} />
            <Tab label="Adicionar Experiência" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <FormContainer<Accommodation>
            onSuccess={onSubmitAccomodation}
            formContext={form}
          >
            <Box>
              <Box className="grid grid-cols-4 gap-2 p-4">
                <TextFieldElement
                  name="title"
                  placeholder="Titulo"
                  label="Titulo"
                  className="col-span-2"
                />
                <TextFieldElement
                  name="description"
                  placeholder="Descricao"
                  label="Descricao"
                  className="col-span-2"
                  multiline
                  maxRows={2}
                />

                <TimePickerElement name="checkIn" label="Horário Check IN" />
                <TimePickerElement name="checkOut" label="Horário Check Out" />

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
                  name="address.numero"
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
                <TextFieldElement
                  name="address.countryState"
                  placeholder="estado"
                  label="estado"
                />
              </Box>
            </Box>

            <Button>Cancelar</Button>
            <Button variant="contained" type="submit">
              Confirmar
            </Button>
          </FormContainer>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <FormContainer<Experience> onSuccess={onSubmitExperience}>
            <Box>
              <Box className="grid grid-cols-4 gap-2 p-4">
                <TextFieldElement
                  name="title"
                  placeholder="Titulo"
                  label="Titulo"
                  fullWidth
                  className="col-span-2"
                />
                <TextFieldElement
                  name="description"
                  placeholder="Descricao"
                  label="Descricao"
                  multiline
                  className="col-span-2"
                />

                <DateTimePickerElement
                  name="dateStart"
                  label="Data e Horário do Inicio"
                />
                <DateTimePickerElement
                  name="dateEnd"
                  label="Data e Horário do Fim"
                />

                <TextFieldElement
                  name="price"
                  placeholder="Valor"
                  label="Valor"
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
                  name="address.cep"
                  placeholder="Cep"
                  label="CEP"
                />

                <TextFieldElement
                  name="address.rua"
                  placeholder="rua"
                  label="rua"
                />
                <TextFieldElement
                  name="address.numero"
                  placeholder="numero"
                  label="numero"
                  type="number"
                />
                <TextFieldElement
                  name="address.bairro"
                  placeholder="bairro"
                  label="bairro"
                />
                <TextFieldElement
                  name="address.cidade"
                  placeholder="cidade"
                  label="cidade"
                />
              </Box>
            </Box>
            <Button>Cancelar</Button>
            <Button variant="contained" type="submit">
              Confirmar
            </Button>
          </FormContainer>
        </CustomTabPanel>
      </div>
    </Box>
  );
};
