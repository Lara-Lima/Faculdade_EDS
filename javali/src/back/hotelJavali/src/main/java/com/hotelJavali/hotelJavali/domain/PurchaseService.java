package com.hotelJavali.hotelJavali.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.Experience;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Purchase;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.BuySellExperience;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.BuySellHosting;
import com.hotelJavali.hotelJavali.infrastructure.repositories.PurchaseRepository;
import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PurchaseService {
    private final PurchaseRepository repository;
    private final CuponsService cuponsService;

    public List<Purchase> findAll() {
        List<Purchase> purchaseList = repository.findAll();
        return purchaseList;
    }

    public List<Purchase> findBySocialId(String socialId) {
        List<Purchase> purchases = repository.findByBuyerSocialId(socialId);
        return purchases != null ? purchases : Collections.emptyList();
    }

    public List<Integer> comprasPorAno() {
        List<Integer> comprasPorAno = repository
                .findAll().stream().map(Purchase::getDatePurchase).map(data -> data.getYear())
                .collect(Collectors.toList());
        return comprasPorAno;
    }

    public Integer quantidadeDeCompraPorMes(Long mes) {
        long count = repository.findAll()
                .stream()
                .filter(h -> h.getDatePurchase().getMonth().getValue() == mes)
                .count();

        return Math.toIntExact(count);
    }

    public List<Integer> quantidadeDeComprasAnoAnterior() {
        List<Integer> quantidadeDeComprasAnoAnterior = new ArrayList<>();

        for (int i = 1; i <= 12; i++) {
            quantidadeDeComprasAnoAnterior.add(quantidadeDeCompraPorMes((long) i));
        }

        return quantidadeDeComprasAnoAnterior;
    }

    public List<Purchase> getMyPurchases(Long userId) {
        List<Purchase> purchaseList = repository.findAll().stream()
                .filter(h -> h.getBuyer() != null && h.getBuyer().getSocialId().equals(userId))
                .collect(Collectors.toList());

        return purchaseList;
    }

    public Long numeroCuponsPorMes(long month) {
        Long numeroCuponsPorMes = repository.findAll().stream()
                .filter(h -> h.getDatePurchase().getMonth().getValue() == month)
                .map(Purchase::getCupons).flatMap(List::stream).count();
        return numeroCuponsPorMes;
    }

    public List<Long> quantidadeDeCuponsAno() {
        List<Long> quantidadeDeCuponsAno = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            quantidadeDeCuponsAno.add(numeroCuponsPorMes((long) i));
        }
        return quantidadeDeCuponsAno;
    }

    public List<Purchase> getMySales(Long userId) {
        List<Purchase> purchaseList = repository.findAll().stream()
                .filter(h -> h.getBuyer() != null && h.getBuyer().equals(userId))
                .collect(Collectors.toList());

        return purchaseList;
    }

    public Purchase findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Hosting> getMyHostingSales(Long userId) {
        List<Hosting> hostingList = repository.findAll().stream()
                .filter(h -> h.getBuyer() != null && h.getBuyer().equals(userId))
                .map(Purchase::getPurchaseHostings)
                .flatMap(List::stream)
                .map(BuySellHosting::getHosting)
                .collect(Collectors.toList());

        return hostingList;
    }

    public List<Hosting> getPurchaseByHostingId(Long hostingId) {
        List<Hosting> hostingList = repository.findAll().stream()
                .filter(h -> h.getPurchaseHostings() != null && h.getPurchaseHostings().stream()
                        .anyMatch(p -> p.getHosting() != null && p.getHosting().getHostingId().equals(hostingId)))
                .flatMap(h -> h.getPurchaseHostings().stream()
                        .filter(p -> p.getHosting() != null && p.getHosting().getHostingId().equals(hostingId))
                        .map(BuySellHosting::getHosting))
                .collect(Collectors.toList());

        return hostingList;
    }

    public List<Experience> getMyExperienceSales(Long userId) {
        List<Experience> experienceList = repository.findAll().stream()
                .filter(h -> h.getBuyer() != null && h.getBuyer().equals(userId))
                .map(Purchase::getPurchaseExperiences)
                .flatMap(List::stream)
                .map(BuySellExperience::getExperience)
                .collect(Collectors.toList());

        return experienceList;
    }

    @Transactional
    public Purchase save(Purchase purchase) {
        final Purchase purchaseSaved = repository.save(purchase);
        cuponsService.generateUserCouponByTenPurchases(purchaseSaved.getBuyer().getId());
        return purchaseSaved;
    }
}
