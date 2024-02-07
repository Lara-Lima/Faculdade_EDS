package com.hotelJavali.hotelJavali.domain.models;

import lombok.Data;

@Data
public class AddressModel {
    private String cep;
    private String street;
    private Integer addressNumber;
    private String neighborhood;
    private String countryState;
    private String city;
}