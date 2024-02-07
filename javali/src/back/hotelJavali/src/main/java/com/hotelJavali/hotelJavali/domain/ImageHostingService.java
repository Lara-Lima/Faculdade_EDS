package com.hotelJavali.hotelJavali.domain;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.ImageHosting;
import com.hotelJavali.hotelJavali.infrastructure.repositories.ImageHostingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageHostingService {

    private final ImageHostingRepository repository;

    public ImageHosting findById(Long id) {
        ImageHosting image = repository.findById(id).orElse(null);
        return image;
    }

    public List<ImageHosting> findAll() {
        List<ImageHosting> imageList = repository.findAll();
        return imageList;
    }

    public List<ImageHosting> findAssessmentsByHostingId(Long hostingId) {
        if (hostingId > 0) {
            return repository.findAll();
        } else {
            log.error("Invalid hostingId provided for finding assessments");
            return Collections.emptyList();
        }
    }

    public List<ImageHosting> findAssessmentsByExperienceId(Long experienceId) {
        if (experienceId > 0) {
            return repository.findAll();
        } else {
            log.error("Invalid experienceId provided for finding assessments");
            return Collections.emptyList();
        }
    }

    public ImageHosting save(ImageHosting image) {
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

    public List<ImageHosting> saveAll(List<ImageHosting> images) {
        try {
            List<ImageHosting> savedImages = repository.saveAll(images);
            return savedImages;
        } catch (Exception exception) {
            log.error("Error while saving images", exception);
            return Collections.emptyList();
        }
    }

}
