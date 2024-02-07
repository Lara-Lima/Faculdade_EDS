package com.hotelJavali.hotelJavali.infrastructure.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.Cupons;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CuponsRepository extends JpaRepository<Cupons, Long> {
    List<Cupons> findByUserId(Long userId);

    Cupons findByCodDoCupom(String codDoCupom);

}