import { Address } from "./address";
import { Assessment2 } from "./assessment";

export type Experience = {
  title: string;
  experienceId: number;
  description: string;
  images: {
    imageId: string;
    url: string;
  }[];
  price: number;
  timeStart: string;
  timeEnd: string;
  date: string;
  userId: string;
  assessments: Assessment2[];
  address: Address;
};
