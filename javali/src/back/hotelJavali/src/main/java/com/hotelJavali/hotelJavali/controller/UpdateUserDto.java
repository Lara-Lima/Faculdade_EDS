package com.hotelJavali.hotelJavali.controller;

import java.time.LocalDate;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.Address;

import lombok.Data;

@Data
public class UpdateUserDto {
    String name;
    String phone;
    Address address;
    LocalDate birthDate;
}
