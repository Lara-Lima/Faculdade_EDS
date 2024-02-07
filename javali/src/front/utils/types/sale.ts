import { Accommodation } from "./accommodation";
import { Experience } from "./experience";

export interface Sale {
  hospedagens: Hospedagen[];
  experiencias: Experiencia[];
}

export interface Hospedagen {
  id: string;
  codCliente: string;
  hospedagem: Accommodation;
}

export interface Experiencia {
  id: string;
  codCliente: string;
  experiencia: Experience;
}
