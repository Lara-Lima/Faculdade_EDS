package com.hotelJavali.hotelJavali.infrastructure.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@AllArgsConstructor
public class AssessmentExperienceData {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "assessment_generator")
    private Long idAssessment;

    @NotNull
    private String titleAssessment;
    @NotNull
    private Long userId;

    @NotNull
    private String descriptionAssessment;

    @DecimalMin("0.0")
    @DecimalMax("10.0")
    private BigDecimal scoreAssessment;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "experience_id", nullable = true)
    private Experience experience;

    public AssessmentExperienceData() {
    }
}
