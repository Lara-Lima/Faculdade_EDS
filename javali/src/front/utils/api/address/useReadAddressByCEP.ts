import { UseQueryOptions, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Address } from "@/utils/types/address";

type ReadAddressProps = {
  cep: string;
};

interface ApiByCepResponse {
  street: string;
  addressNumber: string;
  city: string;
  neighborhood: string;
  state: string;
  country: string;
  // Adicione outros campos conforme necessário
}

export const apiByCep = async (cep: string, init?: RequestInit | undefined): Promise<Address> => {
  const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`, init);
  if (!res.ok) {
    throw new Error("Erro ao carregar endereço!");
  }
  const data: ApiByCepResponse = await res.json();
  return {
    cep,
    street: data.street,
    addressNumber: data.addressNumber,
    city: data.city,
    countryState: data.state,
    neighborhood: data.neighborhood,
  };
};

export const readAddress = async ({ cep }: ReadAddressProps): Promise<Address> => {
  return apiByCep(cep, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const useReadAddressByCEP = (
  cep: string,
  props?: UseQueryOptions<any, Error, Address, [string]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readAddress"], 
    queryFn: () => readAddress({ cep }), 
  });
};
