package com.hotelJavali.hotelJavali.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hotelJavali.hotelJavali.domain.converters.ExperienceConverter;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Experience;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.ImageExperience;
import com.hotelJavali.hotelJavali.infrastructure.repositories.ExperienceRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import com.hotelJavali.hotelJavali.domain.models.ExperienceModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExperienceService {
    private final ExperienceRepository repository;
    private final ExperienceConverter converter;
    private final ImageExperienceService imageService;

    public List<Experience> findAll() {
        List<Experience> experienceList = repository.findAll();
        return experienceList;
    }

    public List<Experience> findExperiencesByOwner(Long idOwner) {
        List<Experience> experienceList = repository.findAll().stream()
                .filter(h -> h.getUserId() != null && h.getUserId().equals(idOwner))
                .collect(Collectors.toList());

        return experienceList;
    }

    public List<Experience> findDistinctExperiencesByOwner(Long idOwner) {
        List<Experience> experienceList = repository.findAll().stream()
                .filter(h -> h.getUserId() != null && !h.getUserId().equals(idOwner))
                .collect(Collectors.toList());

        return experienceList;
    }

    public Experience findExperienceById(Long experienceId) {
        Optional<Experience> experience = repository.findById(experienceId);
        return experience.orElseThrow(() -> new RuntimeException("Experience does not exist."));
    }

    @Transactional
    public Experience save(Experience experience) {

        if (experience.getImages().size() > 0) {
            experience.setImages(
                    experience.getImages().stream().map(image -> {
                        image.setExperience(experience);
                        ImageExperience imageSaved = imageService.save(image);
                        return imageSaved;
                    }).collect(Collectors.toList()));
        }
        return repository.save(experience);
    }

    @Transactional
    public void deleteById(Long experienceId) {
        try {
            repository.deleteById(experienceId);
        } catch (Exception e) {
            throw new RuntimeException("It's not possible to delete this experience.");
        }
    }

    @Transactional
    public Experience updateExperience(Long experienceId, Experience updatedExperience) {
        Optional<Experience> existingExperienceOptional = repository.findById(experienceId);

        if (existingExperienceOptional.isPresent()) {
            Experience existingExperience = existingExperienceOptional.get();

            existingExperience.setTitle(updatedExperience.getTitle());
            existingExperience.setDescription(updatedExperience.getDescription());
            existingExperience.setPrice(updatedExperience.getPrice());
            existingExperience.setTimeStart(updatedExperience.getTimeStart());
            existingExperience.setTimeEnd(updatedExperience.getTimeEnd());
            existingExperience.setDate(updatedExperience.getDate());
            existingExperience.setUserId(updatedExperience.getUserId());
            existingExperience.setImages(updatedExperience.getImages());
            existingExperience.setAssessments(updatedExperience.getAssessments());
            existingExperience.setAddress(updatedExperience.getAddress());

            return repository.save(existingExperience);
        } else {
            throw new RuntimeException("Experience not found with ID: " + experienceId);
        }
    }

    // Dashboard

    public List<Integer> cadastroAnual() {
        List<Integer> cadastroAnual = repository
                .findAll().stream().map(Experience::getDateExperience).map(data -> data.getYear())
                .collect(Collectors.toList());
        return cadastroAnual;
    }

    public Integer quantidadeCadastroExperienciaMes(Long mes) {
        long count = repository.findAll()
                .stream()
                .filter(e -> e.getDateExperience().getMonth().getValue() == mes)
                .count();

        return Math.toIntExact(count);
    }

    public List<Integer> quantidadeCadastrosAnoAnterior() {
        List<Integer> quantidadeCadastrosAnoAnterior = new ArrayList<>();

        for (int i = 1; i <= 12; i++) {
            quantidadeCadastrosAnoAnterior.add(quantidadeCadastroExperienciaMes((long) i));
        }

        return quantidadeCadastrosAnoAnterior;
    }
}