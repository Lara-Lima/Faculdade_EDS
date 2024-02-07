"use client";

import { Accommodation } from "@/utils/types/accommodation";
import { Coupon } from "@/utils/types/coupon";
import { Experience } from "@/utils/types/experience";
import dayjs from "dayjs";
import React, { createContext, useState, useContext, useMemo } from "react";

export type AccommodationDateStartAndDateEnd = {
  dateStart: string;
  dateEnd: string;
  accommodation: Accommodation;
};

export type ExperienceDate = {
  date: string;
  experience: Experience;
};

type CartContextType = {
  accommodations: AccommodationDateStartAndDateEnd[];
  appliedCoupon?: Coupon;
  setAppliedCoupon: (coupon?: Coupon) => void;
  addAccommodation: (accommodation: AccommodationDateStartAndDateEnd) => void;
  removeAccommodation: (id: number) => void;
  clearAccommodations: () => void;
  experiences: ExperienceDate[];
  addExperience: (experience: ExperienceDate) => void;
  removeExperience: (id: number) => void;
  clearExperiences: () => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
};
const CartContext = createContext<CartContextType>({
  total: 0,
  subtotal: 0,
  appliedCoupon: undefined,
  setAppliedCoupon: () => {},
  accommodations: [],
  addAccommodation: (accommodation: AccommodationDateStartAndDateEnd) => {},
  removeAccommodation: (id: number) => {},
  clearAccommodations: () => {},
  experiences: [],
  addExperience: (experience: ExperienceDate) => {},
  removeExperience: (id: number) => {},
  clearExperiences: () => {},
  clearCart: () => {},
});

type CartProviderProps = {
  children: React.ReactNode;
};
export function CartProvider({ children }: CartProviderProps) {
  const [accommodations, setAccommodations] = useState<
    AccommodationDateStartAndDateEnd[]
  >([]);
  const [experiences, setExperiences] = useState<ExperienceDate[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | undefined>();

  const subtotalAndTotal = useMemo(() => {
    const accommodationTotal = accommodations.reduce((acc, accommodation) => {
      const totalDays = dayjs(accommodation.dateEnd).diff(
        accommodation.dateStart,
        "day"
      );

      const rentPrice =
        accommodation.accommodation.rentPrice * (totalDays || 1);
      const hasActiveCoupon = accommodation.accommodation.cupons?.find(
        (coupon) => coupon.disponivel
      );
      const finalValue =
        rentPrice - (rentPrice * (hasActiveCoupon?.desconto || 0)) / 100;
      return acc + finalValue;
    }, 0);
    const experienceTotal = experiences.reduce((acc, experience) => {
      return acc + experience.experience.price;
    }, 0);
    const subtotal = accommodationTotal + experienceTotal;

    const total = subtotal - (subtotal * (appliedCoupon?.desconto || 0)) / 100;

    return {
      total,
      subtotal,
    };
  }, [accommodations, appliedCoupon?.desconto, experiences]);

  const addAccommodation = (
    accommodation: AccommodationDateStartAndDateEnd
  ) => {
    if (
      !accommodations.find(
        (a) =>
          a.accommodation.hostingId === accommodation.accommodation.hostingId
      )
    ) {
      setAccommodations((prevAccommodations) => [
        ...prevAccommodations,
        accommodation,
      ]);
    }
  };

  const removeAccommodation = (id: number) => {
    setAccommodations((prevAccommodations) =>
      prevAccommodations.filter(
        (accommodation) => accommodation.accommodation.hostingId !== id
      )
    );
  };

  const clearAccommodations = () => {
    setAccommodations([]);
  };

  const addExperience = (experience: ExperienceDate) => {
    if (
      !experiences.find(
        (a) => a.experience.experienceId === experience.experience.experienceId
      )
    ) {
      setExperiences((prevExperiences) => [...prevExperiences, experience]);
    }
  };

  const removeExperience = (id: number) => {
    setExperiences((prevExperiences) =>
      prevExperiences.filter(
        (experience) => experience.experience.experienceId !== id
      )
    );
  };

  const clearExperiences = () => {
    setExperiences([]);
  };

  const clearCart = () => {
    clearAccommodations();
    clearExperiences();
    setAppliedCoupon(undefined);
  };

  return (
    <CartContext.Provider
      value={{
        total: subtotalAndTotal.total,
        subtotal: subtotalAndTotal.subtotal,
        appliedCoupon,
        setAppliedCoupon,
        accommodations,
        addAccommodation,
        removeAccommodation,
        clearAccommodations,
        experiences,
        addExperience,
        removeExperience,
        clearExperiences,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
