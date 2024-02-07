package com.hotelJavali.hotelJavali.infrastructure.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;

@Repository
public interface HostingRepository extends JpaRepository<Hosting, Long>{
    
}
