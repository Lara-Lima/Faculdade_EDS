package com.hotelJavali.hotelJavali.domain;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.AssessmentExperienceData;
import com.hotelJavali.hotelJavali.infrastructure.repositories.AssessmentExperienceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssessmentExperienceService {

    private final AssessmentExperienceRepository repository;

    public AssessmentExperienceData findById(Long id) {
        AssessmentExperienceData assessmentData = repository.findById(id).orElse(null);
        return assessmentData;
    }

    public List<AssessmentExperienceData> findAll() {
        List<AssessmentExperienceData> assessmentDataList = repository.findAll();
        return assessmentDataList;
    }

    public List<AssessmentExperienceData> findAssessmentsByExperienceId(Long experienceId) {
        if (experienceId > 0) {
            return repository.findAll();
        } else {
            log.error("Invalid experienceId provided for finding assessments");
            return Collections.emptyList();
        }
    }

    public AssessmentExperienceData save(AssessmentExperienceData assessmentData) {
        try {
            assessmentData = repository.save(assessmentData);
            return assessmentData;
        } catch (Exception exception) {
            log.error("Erro ao salvar Avaliação", exception);
            return null;
        }
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public AssessmentExperienceData updateAssessmentData(Long id, AssessmentExperienceData assessmentData) {
        try {
            AssessmentExperienceData existingData = repository.findById(id).orElse(null);
            if (existingData != null) {
                existingData.setTitleAssessment(assessmentData.getTitleAssessment());
                existingData.setUserId(assessmentData.getUserId());
                existingData.setDescriptionAssessment(assessmentData.getDescriptionAssessment());
                existingData.setScoreAssessment(assessmentData.getScoreAssessment());

                existingData = repository.save(existingData);
                return existingData;
            } else {
                log.error("Avaliação não encontrada para atualização");
                return null;
            }
        } catch (Exception exception) {
            log.error("Erro ao atualizar Avaliação", exception);
            return null;
        }
    }
}
