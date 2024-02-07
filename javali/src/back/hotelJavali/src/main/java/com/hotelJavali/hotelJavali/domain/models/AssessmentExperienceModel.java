package com.hotelJavali.hotelJavali.domain.models;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class AssessmentExperienceModel {
    private String idAssessment;
    private String titleAssessment;
    private Long userId;
    private String descriptionAssessment;
    private BigDecimal scoreAssessment;
    private Long experience_id;
}
