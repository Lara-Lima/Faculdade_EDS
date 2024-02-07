package com.hotelJavali.hotelJavali.infrastructure.models.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Data
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "hostingId")
public class Hosting {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hosting_generator")
    private Long hostingId;

    @Column(name = "`timestamp`")
    @CreationTimestamp
    private LocalDate dateHosting;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private Integer roomsQuantity;

    @NotNull
    private Integer bathroomsQuantity;

    @NotNull
    private Double rentPrice;

    @NotNull
    private Double hostingArea;

    @NotNull
    private Long userId;

    @NotNull
    private int maxCapacity;

    @NotNull
    private String checkIn;

    @NotNull
    private String checkOut;

    @OneToMany(mappedBy = "hosting", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIdentityReference(alwaysAsId = true)
    private List<AssessmentHostingData> assessments;

    @OneToMany(mappedBy = "hosting", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIdentityReference(alwaysAsId = true)
    private List<Cupons> cupons;

    @OneToMany(mappedBy = "hosting", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIdentityReference(alwaysAsId = true)
    private List<ImageHosting> images;

    @NotNull
    private Address address;

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getMaxCapacity() {
        return this.maxCapacity;
    }

    public void setMaxCapacity(int maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    public String getCheckIn() {
        return this.checkIn;
    }

    public void setCheckIn(String checkIn) {
        this.checkIn = checkIn;
    }

    public String getCheckOut() {
        return this.checkOut;
    }

    public void setCheckOut(String checkOut) {
        this.checkOut = checkOut;
    }

    public Long getHostingId() {
        return this.hostingId;
    }

    public void setHostingId(Long hostingId) {
        this.hostingId = hostingId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRoomsQuantity() {
        return this.roomsQuantity;
    }

    public void setRoomsQuantity(Integer roomsQuantity) {
        this.roomsQuantity = roomsQuantity;
    }

    public Integer getBathroomsQuantity() {
        return this.bathroomsQuantity;
    }

    public void setBathroomsQuantity(Integer bathroomsQuantity) {
        this.bathroomsQuantity = bathroomsQuantity;
    }

    public Double getRentPrice() {
        return this.rentPrice;
    }

    public void setRentPrice(Double rentPrice) {
        this.rentPrice = rentPrice;
    }

    public Double getHostingArea() {
        return this.hostingArea;
    }

    public void setHostingArea(Double hostingArea) {
        this.hostingArea = hostingArea;
    }

}
