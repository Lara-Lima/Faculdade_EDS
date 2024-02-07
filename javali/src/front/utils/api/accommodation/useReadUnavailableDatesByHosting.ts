import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Accommodation } from "@/utils/types/accommodation";
import { api } from "../api";
import queryString from 'query-string';
import { Dayjs } from "dayjs";


export const readUnavailableDatesByHosting = async (hostingId?: number): Promise<Dayjs[]> => {
  const userId = localStorage.getItem("user");

  const url = `/api/unavailableDatesForHosting/${hostingId}`;

  const res = await api(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });


  if (!res.ok) {
    throw new Error("Erro ao carregar as acomodações!");
  }
  if(res.status === 204) return ([] as Dayjs[]);
  return (await res.json()) as Dayjs[];
};

type Args= {
  hostingId?: number;
} & Partial<UseQueryOptions<any, Error, Dayjs[], [string]>>
export const useReadUnavailableDatesByHosting = (
  {
    hostingId,
    ...props
  }: Args = {}
) => {
  return useQuery({
    ...props,
    queryKey: ["readUnavailableDatesByHosting"],
    queryFn: () => readUnavailableDatesByHosting(hostingId),
  });
};