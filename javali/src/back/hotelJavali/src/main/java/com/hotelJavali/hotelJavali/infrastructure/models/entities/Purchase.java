package com.hotelJavali.hotelJavali.infrastructure.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Data
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "purchaseId")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "assessment_generator")
    private Long purchaseId;

    @NotNull
    private Double price;

    @Column(name = "`timestamp`")
    @CreationTimestamp
    private LocalDate datePurchase;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "buyer_id")
    private UserData buyer;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BuySellHosting> purchaseHostings;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BuySellExperience> purchaseExperiences;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<Cupons> cupons;

    public Long getPurchaseId() {
        return this.purchaseId;
    }

    public void setPurchaseId(Long purchseId) {
        this.purchaseId = purchseId;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

}