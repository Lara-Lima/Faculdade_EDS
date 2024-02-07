package com.hotelJavali.hotelJavali.infrastructure.models.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
@Nonnull
public class Address {
    private String cep;
    private String street;
    private Integer addressNumber;
    private String neighborhood;
    private String city;
    private String countryState;
}