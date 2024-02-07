package com.hotelJavali.hotelJavali.domain;

import java.time.LocalDate;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.BuySellExperience;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Experience;
import com.hotelJavali.hotelJavali.infrastructure.repositories.BuySellExperienceRepository;
import com.hotelJavali.hotelJavali.infrastructure.repositories.ExperienceRepository;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BuySellExperienceService {

        private final BuySellExperienceRepository repository;
        private final ExperienceRepository experienceRepository;

        public List<BuySellExperience> findAll() {
                List<BuySellExperience> purchaseExperienceList = repository.findAll();
                return purchaseExperienceList;
        }

        public List<BuySellExperience> getMyPurchaseExperiences(Long userId) {
                List<BuySellExperience> purchaseExperienceList = repository.findAll().stream()
                                .filter(experience -> experience.getBuyerUserId() != null &&
                                                experience.getBuyerUserId().equals(userId))
                                .collect(Collectors.toList());
                return purchaseExperienceList;
        }

        public double razaoExperienceAvaliadaOuNao() {
                long totalExperienciasCompradas = repository.findAll().stream()
                                .filter(experience -> experience.getBuyerUserId() != null)
                                .count();

                long experienciasAvaliadas = repository.findAll().stream()
                                .filter(experience -> experience.getBuyerUserId() != null &&
                                                experience.getExperience().getAssessments().size() > 0)
                                .count();

                if (totalExperienciasCompradas != 0) {
                        double porcentagemAvaliadas = (double) experienciasAvaliadas / totalExperienciasCompradas;
                        return porcentagemAvaliadas;
                } else {
                        return 0.0;
                }
        }

        public List<BuySellExperience> getMyPurchaseByOneExperience(Long userId, Long experienceId) {
                List<BuySellExperience> purchaseExperienceList = repository.findAll().stream()
                                .filter(h -> h.getBuyerUserId() != null && h.getBuyerUserId().equals(userId))
                                .filter(h -> h.getExperience().getExperienceId() != null
                                                && h.getExperience().getExperienceId().equals(experienceId))
                                .collect(Collectors.toList());

                return purchaseExperienceList;
        }

        public List<BuySellExperience> getMySalesExperiences(Long userId) {
                List<BuySellExperience> purchaseExperienceList = repository.findAll().stream()
                                .filter(h -> h.getSellerUserId() != null
                                                && h.getExperience().getUserId().equals(userId))
                                .collect(Collectors.toList());

                return purchaseExperienceList;
        }

        public List<BuySellExperience> getMySalesByOneExperience(Long userId, Long experienceId) {
                List<BuySellExperience> purchaseExperienceList = repository.findAll().stream()
                                .filter(h -> h.getSellerUserId() != null && h.getSellerUserId().equals(userId))
                                .filter(h -> h.getExperience().getExperienceId() != null
                                                && h.getExperience().getExperienceId().equals(experienceId))
                                .collect(Collectors.toList());

                return purchaseExperienceList;
        }

        public BuySellExperience findById(Long id) {
                return repository.findById(id).orElse(null);
        }

        public List<Experience> getAvailableExperiences(Long userId, LocalDate date) {
                List<Experience> allExperiences = experienceRepository.findAll();

                List<Experience> experienceDistinctUser = allExperiences.stream()
                                .filter(e -> !e.getUserId().equals(userId))
                                .collect(Collectors.toList());

                List<Experience> availableExperiences = experienceDistinctUser
                                .stream().filter(experience -> experience.getDate() != null
                                                && experience.getDate().equals(date))
                                .collect(Collectors.toList());

                return availableExperiences;
        }

        // private boolean isDateRangeAvailable(BuySellExperience usedDate, LocalDate
        // dateStart, LocalDate dateEnd) {
        // LocalDate usedDateStart = usedDate.getDateStart();
        // LocalDate usedDateEnd = usedDate.getDateEnd();

        // return dateStart.compareTo(usedDateEnd) > 0 ||
        // dateEnd.compareTo(usedDateStart) < 0;
        // }

        // public List<Experience> getAvailableExperiences(LocalDate dateStart,
        // LocalDate dateEnd) {
        // List<BuySellExperience> allUsedDates = repository.findAll();

        // List<Experience> availableExperiences = allUsedDates.stream()
        // .filter(usedDate -> isDateRangeAvailable(usedDate, dateStart, dateEnd))
        // .map(BuySellExperience::getExperience).distinct()
        // .collect(Collectors.toList());

        // return availableExperiences;
        // }

        @Transactional
        public BuySellExperience save(BuySellExperience purchaseExperience) {
                return repository.save(purchaseExperience);
        }
}
