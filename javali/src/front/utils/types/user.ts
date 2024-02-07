import { Address } from "./address";
import { BuyResponse2 } from "./buy";

export type User = {
  id?: number;
  name: string;
  phone: string;
  birthDate: Date;
  socialId: string;
  email: string;
  password: string;
  active?: boolean;
  purchases: BuyResponse2[];
  address: Address;
};

