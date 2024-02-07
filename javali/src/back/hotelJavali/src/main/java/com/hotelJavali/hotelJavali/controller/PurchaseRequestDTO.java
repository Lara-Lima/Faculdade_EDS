package com.hotelJavali.hotelJavali.controller;

import java.time.LocalDate;

import java.util.List;
import java.util.Optional;

import lombok.Data;

@Data
public class PurchaseRequestDTO {
    private Long buyer;
    private List<PurchaseHostingRequestDTO> purchaseHostings;
    private List<PurchaseExperienceRequestDTO> purchaseExperiences;
    private Long cupomId;
}

@Data
class PurchaseHostingRequestDTO {
    private Long hostingId;
    private LocalDate dateStart;
    private LocalDate dateEnd;
}

@Data
class PurchaseExperienceRequestDTO {
    private Long experienceId;
    private LocalDate date;
}
