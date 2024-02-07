import { Accommodation } from "./accommodation";
import { Address } from "./address";
import { Coupon } from "./coupon";
import { Experience } from "./experience";
import { User } from "./user";

export interface Buy {
  buyer: number;
  purchaseId: number;
  purchaseHostings: PurchaseHostingRequestDTO[];
  purchaseExperiences: PurchaseExperienceRequestDTO[];
  datePurchase: string;
}

export interface PurchaseHostingRequestDTO {
  hosting: Accommodation;
  dateStart: string;
  dateEnd: string;
  hostingTotalPrice: number;
}

export interface PurchaseExperienceRequestDTO {
  experience: Experience;
  date: string;
}

export type BuyResponse = {
  purchase: Buy;

  hosting: Accommodation;
  buyerUserId: number;
  title: string;
  sellerUserId: number;
  dateStart: string;
  dateEnd: string;
  days: number;
  address: Address;
  hostingTotalPrice: number;
  hostingPrice: number;
  hostingTitle: string;
};
export type BuyResponse2 = {
  buyer: User;
  datePurchase: number;
  price: number;
  cupons: Coupon[];
  purchaseExperiences: PurchaseExperienceRequestDTO[];
  purchaseHostings: PurchaseHostingRequestDTO[];
  purchaseId: number;
};
