package com.hotelJavali.hotelJavali.infrastructure.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "purchase_hosting")
public class BuySellHosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @CreationTimestamp
    // @NotNull
    // private LocalDate datePurchase;

    @Column(name = "createad_At")
    @CreationTimestamp
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "purchase_id")
    private Purchase purchase;

    @ManyToOne
    @JoinColumn(name = "hosting_id")
    private Hosting hosting;

    @NotNull
    private Long buyerUserId;

    @NotNull
    private Long sellerUserId;

    @NotNull
    private LocalDate dateStart;

    @NotNull
    private LocalDate dateEnd;

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

    public LocalDate getDateStart() {
        return dateStart;
    }

    public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
    }

    public LocalDate getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(LocalDate dateEnd) {
        this.dateEnd = dateEnd;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public Purchase getPurchase() {
        return this.purchase;
    }

    public void setHosting(Hosting hosting) {
        this.hosting = hosting;
    }

    public Hosting getHosting() {
        return this.hosting;
    }

    public Double getHostingPrice() {
        return hosting.getRentPrice();
    }

    public long getDays() {
        if (dateStart != null && dateEnd != null) {
            return ChronoUnit.DAYS.between(dateStart, dateEnd);
        } else {
            return 0; // ou outra lógica apropriada para tratamento de nulos
        }
    }

    public Double getHostingTotalPrice() {
        return hosting.getRentPrice() * getDays();
    }

}
