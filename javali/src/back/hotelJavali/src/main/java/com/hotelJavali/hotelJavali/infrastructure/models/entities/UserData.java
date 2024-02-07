package com.hotelJavali.hotelJavali.infrastructure.models.entities;

import com.hotelJavali.hotelJavali.domain.models.AddressModel;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.br.CPF;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
// property = "id")
public class UserData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private boolean active;

    @NotNull
    private LocalDate birthDate;

    @NotBlank
    private String phone;

    @Email
    private String email;

    @NotNull
    private String password;

    @CPF
    @NotBlank
    private String socialId;

    @Column(name = "`timestamp`")
    @CreationTimestamp
    private LocalDate dateUserCreate;

    @Embedded
    @NotNull
    private Address address;

    // @OneToOne(cascade = CascadeType.ALL)
    // @JoinColumn(name = "image_id", referencedColumnName = "imageId")
    // private Image image;

}