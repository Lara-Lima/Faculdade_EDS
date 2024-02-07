package com.hotelJavali.hotelJavali.domain.models;

import java.time.LocalDate;

import java.util.List;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.AssessmentHostingData;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.ImageExperience;

import lombok.Data;

@Data
public class ExperienceModel {

    private Long experienceId;
    private String title;
    private String timeEnd;
    private String timeStart;
    private LocalDate date;
    private String description;
    private String image;
    private Double price;
    private List<AssessmentHostingData> assessments;
    private List<ImageExperience> images;

}
