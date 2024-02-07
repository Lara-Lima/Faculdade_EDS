package com.hotelJavali.hotelJavali.infrastructure.models.entities;

import java.time.LocalDate;

import java.time.temporal.ChronoUnit;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "purchase_experience")
public class BuySellExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "purchase_id")
    private Purchase purchase;

    @ManyToOne
    @JoinColumn(name = "experience_id")
    private Experience Experience;

    @NotNull
    private Long buyerUserId;

    @NotNull
    private Long sellerUserId;

    @Column(name = "date")
    private LocalDate date;

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getDate() {
        return date;
    }

    public Long getBuyerUserId() {
        return buyerUserId;
    }

    public void setBuyerUserId(Long buyerUserId) {
        this.buyerUserId = buyerUserId;
    }

    public Long getSellerUserId() {
        return sellerUserId;
    }

    public void setSellerUserId(Long sellerUserId) {
        this.sellerUserId = sellerUserId;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public Purchase getPurchase() {
        return this.purchase;
    }

    public void setExperience(Experience Experience) {
        this.Experience = Experience;
    }

    public Experience getExperience() {
        return this.Experience;
    }

    public Double getExperiencePrice() {
        return Experience.getPrice();
    }
}
