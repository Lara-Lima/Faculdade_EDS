import { Address } from "./address";
import { Assessment2 } from "./assessment";
import { Coupon } from "@/utils/types/coupon";

export type Accommodation = {
  title: string;
  hostingId: number;
  description: string;
  userId: string;
  images: {
    url: string;
    imageId: number;
  }[];
  rentPrice: number;
  roomsQuantity: number;
  maxCapacity: number;
  bathroomsQuantity: number;
  checkIn: string;
  checkOut: string;
  hostingArea: number;
  address?: Address;
  assessments: Assessment2[];
  cupons?: Coupon[];
};
