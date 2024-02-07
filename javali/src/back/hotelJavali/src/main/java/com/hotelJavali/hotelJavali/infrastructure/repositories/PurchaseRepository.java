package com.hotelJavali.hotelJavali.infrastructure.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import org.springframework.stereotype.Repository;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.Purchase;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    @Query("SELECT p FROM Purchase p WHERE p.buyer.socialId = :socialId")
    List<Purchase> findByBuyerSocialId(@Param("socialId") String socialId);

    @Query("SELECT p FROM Purchase p WHERE p.buyer.id = :id")
    List<Purchase> findByBuyerId(@Param("id") Long id);

}
