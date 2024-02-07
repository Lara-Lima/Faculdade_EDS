package com.hotelJavali.hotelJavali.domain.models;

import lombok.Data;

@Data
public class UserPasswordModel {
    private String socialId;
    private String email;
    private String password;
    private Long Id;
}