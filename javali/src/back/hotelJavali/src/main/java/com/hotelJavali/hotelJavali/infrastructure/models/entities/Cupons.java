package com.hotelJavali.hotelJavali.infrastructure.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
public class Cupons {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cupomId;

    @NotNull
    private String codDoCupom;

    @NotNull
    private Long userId;

    @NotNull
    private String titulo;

    @NotNull
    private Boolean disponivel;

    @NotNull
    private LocalDate dataExpiracao;
    @NotNull
    private Integer categoria;

    @NotNull
    private Double desconto;

    public Long getCupomId() {
        return this.cupomId;
    }

    public void setCupomId(Long cupomId) {
        this.cupomId = cupomId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitulo() {
        return this.titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Boolean isDisponivel() {
        return this.disponivel;
    }

    public Boolean getDisponivel() {
        return this.disponivel;
    }

    public void setDisponivel(Boolean disponivel) {
        this.disponivel = disponivel;
    }

    public LocalDate getDataExpiracao() {
        return this.dataExpiracao;
    }

    public void setDataExpiracao(LocalDate dataExpiracao) {
        this.dataExpiracao = dataExpiracao;
    }

    public Integer getCategoria() {
        return this.categoria;
    }

    public void setCategoria(Integer categoria) {
        this.categoria = categoria;
    }

    public Double getDesconto() {
        return this.desconto;
    }

    public void setDesconto(Double desconto) {
        this.desconto = desconto;
    }

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "hosting_id", nullable = true)
    private Hosting hosting;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "purchase_id", nullable = true)
    private Purchase purchase;

}