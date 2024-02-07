package com.hotelJavali.hotelJavali.controller;

import com.hotelJavali.hotelJavali.domain.BuySellHostingService;
import com.hotelJavali.hotelJavali.domain.HostingService;
import com.hotelJavali.hotelJavali.domain.models.HostingModel;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.BuySellHosting;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/", produces = "application/json")
public class BuySellHostingController {
    @Autowired
    private final BuySellHostingService purchaseService;
    private final HostingService hostingService;

    @GetMapping("/myPurchaseHostings/{id}")
    public ResponseEntity<List<BuySellHosting>> getMyPurchases(@PathVariable Long id) {
        try {
            List<BuySellHosting> purchases = purchaseService.getMyPurchaseHostings(id);
            if (!purchases.isEmpty()) {
                return ResponseEntity.ok(purchases);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/mySalesHostings/{userId}")
    public ResponseEntity<List<BuySellHosting>> getMySalesHostings(@PathVariable Long userId) {
        try {
            List<BuySellHosting> purchases = purchaseService.getMySalesHostings(userId);
            if (!purchases.isEmpty()) {
                return ResponseEntity.ok(purchases);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/mySalesByOneHosting/{userId}/hosting/{hostingId}")

    public ResponseEntity<List<BuySellHosting>> getMySalesByOneHosting(@PathVariable Long userId,
            @PathVariable Long hostingId) {
        try {
            List<BuySellHosting> purchases = purchaseService.getMySalesByOneHosting(userId, hostingId);
            if (!purchases.isEmpty()) {
                return ResponseEntity.ok(purchases);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/razaoCompraHostingPorAvaliacao")
    public ResponseEntity<Double> razaoExperienceAvaliadaOuNao() {
        Double razao = purchaseService.razaoHostingAvaliadaOuNao();
        return ResponseEntity.ok(razao);
    }

    @GetMapping("/myPurchaseByOneHosting/{userId}/hosting/{hostingId}")
    public ResponseEntity<List<BuySellHosting>> getMyPurchaseByOneHosting(@PathVariable Long userId,
            @PathVariable Long hostingId) {
        try {
            List<BuySellHosting> purchases = purchaseService.getMyPurchaseByOneHosting(userId, hostingId);
            if (!purchases.isEmpty()) {
                return ResponseEntity.ok(purchases);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // @GetMapping("/hostingsdistinctUser/{userId}/dateStart/{dateStart}/dateEnd/{dateEnd}")
    // public ResponseEntity<List<Hosting>> getAvailableHostings(@PathVariable Long
    // userId,
    // @PathVariable LocalDate dateStart,
    // @PathVariable LocalDate dateEnd) {
    // try {
    // List<Hosting> hostings = purchaseService.getAvailableHostings(userId,
    // dateStart, dateEnd);
    // if (!hostings.isEmpty()) {
    // return ResponseEntity.ok(hostings);
    // }
    // return ResponseEntity.noContent().build();
    // } catch (Exception exception) {
    // return ResponseEntity.internalServerError().build();
    // }
    // }

    @GetMapping("/hostingsdistinctUser")
    public ResponseEntity<List<Hosting>> getAvailableHostings(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam Long userId) {

        try {
            List<Hosting> hostings;

            if (startDate != null && endDate != null) {
                hostings = purchaseService.getAvailableHostings(userId, startDate, endDate);
                return ResponseEntity.ok(hostings);
            } else if (startDate != null) {
                hostings = purchaseService.getAvailableHostings(userId, startDate, null);
            } else if (endDate != null) {
                hostings = purchaseService.getAvailableHostings(userId, null, endDate);
            } else {
                List<Hosting> hosting2 = hostingService.findDistinctHostingsByOwner2(userId);
                return ResponseEntity.ok(hosting2);
            }

            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // getUnavailableDatesForHosting
    @GetMapping("/unavailableDatesForHosting/{hostingId}")
    public ResponseEntity<List<LocalDate>> getUnavailableDatesForHosting(@PathVariable Long hostingId) {
        try {
            List<LocalDate> unavailableDates = purchaseService.getDaysBuyersByHosting(hostingId);
            if (unavailableDates != null && !unavailableDates.isEmpty()) {
                return ResponseEntity.ok(unavailableDates);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
