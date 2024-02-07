package com.hotelJavali.hotelJavali.domain.models;

import java.time.LocalDate;

import java.util.List;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.Cupons;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Experience;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.UserData;

import lombok.Data;

@Data
public class PurchaseModel {
    private Long purchseId;
    private Double price;
    private LocalDate datePurchase;
    private Long buyerId;
    private UserData user;
    private List<Hosting> hostings;
    private List<Experience> experiences;
    private List<Cupons> cupons;
}