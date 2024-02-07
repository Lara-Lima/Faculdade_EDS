package com.hotelJavali.hotelJavali.infrastructure.repositories;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.AssessmentExperienceData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssessmentExperienceRepository extends JpaRepository<AssessmentExperienceData, Long> {
}
