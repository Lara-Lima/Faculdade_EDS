package com.hotelJavali.hotelJavali.controller;

import com.hotelJavali.hotelJavali.domain.BuySellExperienceService;
import com.hotelJavali.hotelJavali.domain.ExperienceService;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.BuySellExperience;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Experience;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/", produces = "application/json")
public class BuySellExperienceController {
    @Autowired
    private final BuySellExperienceService purchaseService;
    private final ExperienceService experienceService;

    @GetMapping("/myPurchaseExperience/{id}")
    public ResponseEntity<List<BuySellExperience>> getMyPurchasesExperience(@PathVariable Long id) {
        try {
            List<BuySellExperience> purchases = purchaseService.getMyPurchaseExperiences(id);
            if (!purchases.isEmpty()) {
                return ResponseEntity.ok(purchases);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/razaoCompraExperiencePorAvaliacao")
    public ResponseEntity<Double> razaoExperienceAvaliadaOuNao() {
        Double razao = purchaseService.razaoExperienceAvaliadaOuNao();
        return ResponseEntity.ok(razao);
    }

    @GetMapping("/mySalesExperience/{userId}")
    public ResponseEntity<List<BuySellExperience>> getMySales(@PathVariable Long userId) {
        try {
            List<BuySellExperience> purchases = purchaseService.getMySalesExperiences(userId);
            if (!purchases.isEmpty()) {
                return ResponseEntity.ok(purchases);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/mySalesByOneExperience/{userId}/experience/{experienceId}")

    public ResponseEntity<List<BuySellExperience>> getMySalesByOneExperience(@PathVariable Long userId,
            @PathVariable Long experienceId) {
        try {
            List<BuySellExperience> purchases = purchaseService.getMySalesByOneExperience(userId, experienceId);
            if (!purchases.isEmpty()) {
                return ResponseEntity.ok(purchases);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/myPurchaseByOneExperience/{userId}/experience/{experienceId}")
    public ResponseEntity<List<BuySellExperience>> getMyPurchaseByOneExperience(@PathVariable Long userId,
            @PathVariable Long experienceId) {
        try {
            List<BuySellExperience> purchases = purchaseService.getMyPurchaseByOneExperience(userId, experienceId);
            if (!purchases.isEmpty()) {
                return ResponseEntity.ok(purchases);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/experiencesDistinctUser")
    public ResponseEntity<List<Experience>> getDistinctUserExperiences(
            @RequestParam(required = false) LocalDate date,
            @RequestParam Long userId) {

        try {
            List<Experience> experiences;

            if (date != null) {
                experiences = purchaseService.getAvailableExperiences(userId, date);
            } else {
                experiences = experienceService.findDistinctExperiencesByOwner(userId);
            }

            if (!experiences.isEmpty()) {
                return ResponseEntity.ok(experiences);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // @GetMapping("/experi
    // public ResponseEntity<List<Experie
    // Local
    // @PathVariable LocalDate dateEn
    // try {
    // List<Experience> experiences
    // purchaseService.getAvailableExperience
    // i
    // return ResponseEntity.ok(experiences);
    // }
    // return ResponseEntity.noContent().build();
    // }
    // return ResponseEntity.internalServerError().build();
    // }
    // }

}
