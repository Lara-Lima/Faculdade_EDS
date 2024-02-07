package com.hotelJavali.hotelJavali.infrastructure.models.entities;

//import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Supplier extends UserData {
    private String supplierCode;
    private Boolean active;
}
