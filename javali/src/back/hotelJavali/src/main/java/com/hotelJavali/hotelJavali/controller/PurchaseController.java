package com.hotelJavali.hotelJavali.controller;

import com.hotelJavali.hotelJavali.domain.CuponsService;
import com.hotelJavali.hotelJavali.domain.ExperienceService;
import com.hotelJavali.hotelJavali.domain.HostingService;
import com.hotelJavali.hotelJavali.domain.PurchaseService;
import com.hotelJavali.hotelJavali.domain.UserService;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Experience;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Purchase;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.BuySellExperience;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.BuySellHosting;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Cupons;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/purchase", produces = "application/json")
public class PurchaseController {
    @Autowired
    private final PurchaseService purchaseService;
    private final HostingService hostingService;
    private final ExperienceService experienceService;
    private final CuponsService cuponsService;
    private final UserService userService;

    @GetMapping("/myPurchase/{socialId}")
    public ResponseEntity<List<Purchase>> getMyPurchases(@PathVariable String socialId) {
        try {
            List<Purchase> purchases = purchaseService.findBySocialId(socialId);
            if (!purchases.isEmpty()) {
                return ResponseEntity.ok(purchases);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/compraPorMes")
    public ResponseEntity<List<Integer>> quantidadeDeComprasAnoAnterior() {
        List<Integer> comprasPorMes = purchaseService.quantidadeDeComprasAnoAnterior();
        return ResponseEntity.ok(comprasPorMes);
    }

    @GetMapping("/allPurchases")
    public ResponseEntity<List<Purchase>> getAllPurchases() {
        List<Purchase> purchases = purchaseService.findAll();
        return ResponseEntity.ok(purchases);
    }

    @GetMapping("/cuponsByYear")
    public ResponseEntity<List<Long>> numeroCuponsPorMes() {
        List<Long> numeroCuponsPorMes = purchaseService.quantidadeDeCuponsAno();
        return ResponseEntity.ok(numeroCuponsPorMes);
    }

    @PostMapping("/create")
    public ResponseEntity<Purchase> createPurchase(@RequestBody PurchaseRequestDTO purchaseRequest) {
        Purchase purchase = new Purchase();

        List<BuySellHosting> purchaseHostingList = purchaseRequest.getPurchaseHostings().stream()
                .map(request -> {
                    Long hostingId = request.getHostingId();
                    Hosting hosting = hostingService.findHostingById(hostingId);

                    BuySellHosting purchaseHosting = new BuySellHosting();
                    purchaseHosting.setPurchase(purchase);
                    purchaseHosting.setHosting(hosting);
                    purchaseHosting.setBuyerUserId(purchaseRequest.getBuyer());
                    purchaseHosting.setSellerUserId(hosting.getUserId());
                    purchaseHosting.setDateStart(request.getDateStart());

                    purchaseHosting.setDateEnd(request.getDateEnd());
                    return purchaseHosting;
                })
                .collect(Collectors.toList());

        List<BuySellExperience> purchaseExperienceList = purchaseRequest.getPurchaseExperiences().stream()
                .map(request -> {
                    Long experienceId = request.getExperienceId();
                    Experience experience = experienceService.findExperienceById(experienceId);

                    BuySellExperience purchaseExperience = new BuySellExperience();
                    purchaseExperience.setPurchase(purchase);
                    purchaseExperience.setExperience(experience);
                    purchaseExperience.setBuyerUserId(purchaseRequest.getBuyer());
                    purchaseExperience.setSellerUserId(experience.getUserId());
                    purchaseExperience.setDate(request.getDate());
                    return purchaseExperience;
                })
                .collect(Collectors.toList());

        // List<Cupons> cuponsList = new ArrayList<>();

        purchase.setPurchaseHostings(purchaseHostingList);
        purchase.setPurchaseExperiences(purchaseExperienceList);

        Double hostingTotalPrice = purchaseHostingList.stream().mapToDouble(BuySellHosting::getHostingTotalPrice)
                .sum();
        Double experiencesPrice = purchaseExperienceList.stream().mapToDouble(BuySellExperience::getExperiencePrice)
                .sum();
        purchase.setPrice(hostingTotalPrice + experiencesPrice);

        purchase.setBuyer(userService.findById(purchaseRequest.getBuyer()));

        Purchase purchasedSaved = purchaseService.save(purchase);

        if (purchaseRequest.getCupomId() != null) {
            Cupons cupom = cuponsService.findCupomById(purchaseRequest.getCupomId());
            cupom.setPurchase(purchasedSaved);
            cupom.setDisponivel(false);
            cuponsService.save(cupom);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(purchaseService.save(purchase));
    }

}
