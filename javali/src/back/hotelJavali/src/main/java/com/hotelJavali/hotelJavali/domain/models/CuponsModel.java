package com.hotelJavali.hotelJavali.domain.models;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CuponsModel {
    private Long cupomId;
    private String codDoCupom;
    private Long userId;
    private String titulo;
    private Boolean disponivel;
    private LocalDate dataExpiracao;
    private Long hostingId;
    private Integer categoria;
    private Double desconto;
}