package com.hotelJavali.hotelJavali.domain;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.ImageExperience;
import com.hotelJavali.hotelJavali.infrastructure.repositories.ImageExperienceRepository;
import com.hotelJavali.hotelJavali.infrastructure.repositories.ImageHostingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageExperienceService {

    private final ImageExperienceRepository repository;

    public ImageExperience findById(Long id) {
        ImageExperience image = repository.findById(id).orElse(null);
        return image;
    }

    public List<ImageExperience> findAll() {
        List<ImageExperience> imageList = repository.findAll();
        return imageList;
    }

    public List<ImageExperience> findAssessmentsByHostingId(Long hostingId) {
        if (hostingId > 0) {
            return repository.findAll();
        } else {
            log.error("Invalid hostingId provided for finding assessments");
            return Collections.emptyList();
        }
    }

    public List<ImageExperience> findAssessmentsByExperienceId(Long experienceId) {
        if (experienceId > 0) {
            return repository.findAll();
        } else {
            log.error("Invalid experienceId provided for finding assessments");
            return Collections.emptyList();
        }
    }

    public ImageExperience save(ImageExperience image) {
        try {
            image = repository.save(image);
            return image;
        } catch (Exception exception) {
            log.error("Erro ao salvar Avaliação", exception);
            return null;
        }
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<ImageExperience> saveAll(List<ImageExperience> images) {
        try {
            List<ImageExperience> savedImages = repository.saveAll(images);
            return savedImages;
        } catch (Exception exception) {
            log.error("Error while saving images", exception);
            return Collections.emptyList();
        }
    }

}
