package com.hotelJavali.hotelJavali.infrastructure.repositories;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.AssessmentHostingData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssessmentHostingRepository extends JpaRepository<AssessmentHostingData, Long> {
}
