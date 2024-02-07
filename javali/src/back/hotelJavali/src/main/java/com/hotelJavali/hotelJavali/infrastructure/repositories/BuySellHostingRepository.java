package com.hotelJavali.hotelJavali.infrastructure.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.BuySellHosting;

@Repository
public interface BuySellHostingRepository extends JpaRepository<BuySellHosting, Long> {

}
