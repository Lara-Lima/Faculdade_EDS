package com.hotelJavali.hotelJavali.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.BuySellHosting;
import com.hotelJavali.hotelJavali.infrastructure.repositories.BuySellHostingRepository;
import com.hotelJavali.hotelJavali.infrastructure.repositories.HostingRepository;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BuySellHostingService {

    private final BuySellHostingRepository repository;
    private final HostingRepository hostingRepository;

    public List<BuySellHosting> findAll() {
        List<BuySellHosting> purchaseHostingList = repository.findAll();
        return purchaseHostingList;
    }

    public List<BuySellHosting> getMyPurchaseHostings(Long userId) {
        List<BuySellHosting> purchaseHostingList = repository.findAll().stream()
                .filter(h -> h.getBuyerUserId() != null && h.getBuyerUserId().equals(userId))
                .collect(Collectors.toList());
        return purchaseHostingList;
    }

    public List<BuySellHosting> getMyPurchaseByOneHosting(Long userId, Long hostingId) {
        List<BuySellHosting> purchaseHostingList = repository.findAll().stream()
                .filter(h -> h.getBuyerUserId() != null && h.getBuyerUserId().equals(userId))
                .filter(h -> h.getHosting().getHostingId() != null && h.getHosting().getHostingId().equals(hostingId))
                .collect(Collectors.toList());

        return purchaseHostingList;
    }

    public List<BuySellHosting> getMySalesHostings(Long userId) {
        List<BuySellHosting> purchaseHostingList = repository.findAll().stream()
                .filter(h -> h.getSellerUserId() != null && h.getSellerUserId().equals(userId))
                .collect(Collectors.toList());

        return purchaseHostingList;
    }

    public List<BuySellHosting> getMySalesByOneHosting(Long userId, Long hostingId) {
        List<BuySellHosting> purchaseHostingList = repository.findAll().stream()
                .filter(h -> h.getSellerUserId() != null && h.getSellerUserId().equals(userId))
                .filter(h -> h.getHosting().getHostingId() != null && h.getHosting().getHostingId().equals(hostingId))
                .collect(Collectors.toList());

        return purchaseHostingList;
    }

    public BuySellHosting findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Hosting> getAvailableHostings(Long userId, LocalDate dateStart, LocalDate dateEnd) {
        List<Hosting> allHostings = hostingRepository.findAll();
        List<BuySellHosting> allUsedDates = repository.findAll();

        List<Hosting> hostingDistinctUser = allHostings.stream()
                .filter(hosting -> !hosting.getUserId().equals(userId))
                .collect(Collectors.toList());

        List<Hosting> hostingWithDate = hostingDistinctUser.stream()
                .filter(hosting -> allUsedDates.stream()
                        .noneMatch(usedDate -> usedDate.getHosting().getHostingId().equals(hosting.getHostingId())
                                && (usedDate.getDateStart().compareTo(dateEnd) <= 0
                                        && usedDate.getDateEnd().compareTo(dateStart) >= 0)))
                .collect(Collectors.toList());

        if (dateEnd == null && dateStart == null) {
            return hostingDistinctUser;
        }

        return hostingWithDate;
    }

    public double razaoHostingAvaliadaOuNao() {
        long totalHostingCompradas = repository.findAll().stream()
                .filter(hosting -> hosting.getBuyerUserId() != null)
                .count();

        long hostingAvaliadas = repository.findAll().stream()
                .filter(hosting -> hosting.getBuyerUserId() != null &&
                        hosting.getHosting().getAssessments().size() > 0)
                .count();

        if (totalHostingCompradas != 0) {
            double porcentagemAvaliadas = (double) hostingAvaliadas / totalHostingCompradas;
            return porcentagemAvaliadas;
        } else {
            return 0.0;
        }
    }

    public List<LocalDate> getDaysBuyersByHosting(Long hostingId) {
        List<BuySellHosting> buyHostings = repository.findAll();
        List<LocalDate> daysBuyers = new ArrayList<>();
        for (BuySellHosting buyHosting : buyHostings) {
            if (buyHosting.getHosting().getHostingId().equals(hostingId)) {
                LocalDate dateStart = buyHosting.getDateStart();
                LocalDate dateEnd = buyHosting.getDateEnd();
                while (dateStart.compareTo(dateEnd) <= 0) {
                    daysBuyers.add(dateStart);
                    dateStart = dateStart.plusDays(1);
                }
            }
        }
        return daysBuyers;
    }

    @Transactional
    public BuySellHosting save(BuySellHosting purchaseHosting) {
        return repository.save(purchaseHosting);
    }
}
