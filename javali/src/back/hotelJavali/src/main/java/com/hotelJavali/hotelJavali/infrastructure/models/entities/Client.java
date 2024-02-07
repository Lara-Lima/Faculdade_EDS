package com.hotelJavali.hotelJavali.infrastructure.models.entities;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Client extends UserData {
    private String clientCode;
}