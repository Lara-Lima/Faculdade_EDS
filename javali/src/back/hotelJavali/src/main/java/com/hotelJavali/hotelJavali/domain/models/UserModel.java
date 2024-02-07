package com.hotelJavali.hotelJavali.domain.models;

//import com.hotelJavali.hotelJavali.infrastructure.models.entities.Address;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.Purchase;

@Data
public class UserModel {
    private Long id;

    private String name;
    private String phone;
    private LocalDate birthDate;
    private String email;
    private String socialId;
    private AddressModel address;
    private String password;
    private boolean active;
    private LocalDate dateUserCreate;
    private List<Purchase> purchases;
}