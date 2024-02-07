package com.hotelJavali.hotelJavali.domain.models;

import java.time.LocalDate;
import java.util.List;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.AssessmentHostingData;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Cupons;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.ImageHosting;

import lombok.Data;

@Data

public class HostingModel {

    private Long hostingId;
    private String title;
    private String description;
    private Integer roomsQuantity;
    private Integer bathroomsQuantity;
    private Double rentPrice;
    private Double hostingArea;
    private Long userId;
    private int maxCapacity;
    private String checkIn;
    private String checkOut;
    private AddressModel address;
    private List<AssessmentHostingData> assessments;
    private List<Cupons> cupons;
    private List<ImageHosting> images;
}
