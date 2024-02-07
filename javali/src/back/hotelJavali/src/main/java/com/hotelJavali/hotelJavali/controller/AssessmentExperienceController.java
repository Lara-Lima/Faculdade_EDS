package com.hotelJavali.hotelJavali.controller;

import com.hotelJavali.hotelJavali.domain.AssessmentExperienceService;
import com.hotelJavali.hotelJavali.domain.ExperienceService;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.AssessmentExperienceData;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Experience;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@RestController
@RequiredArgsConstructor
@RequestMapping(
    value = "/api/assessmentExperience",
        consumes = "application/json",
        produces = "application/json")
public class AssessmentExperienceController {

    @Autowired
    
    private final AssessmentExperienceService service;
    private final ExperienceService hostingService;


    @GetMapping("/all")
    public ResponseEntity<List<AssessmentExperienceData>> getAllAssessments() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentExperienceData> getAssessmentById(@PathVariable Long id) {
        try {
            AssessmentExperienceData model = service.findById(id);
            if (nonNull(model)) {
                return ResponseEntity.ok(model);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/create/{hostingId}")
    public ResponseEntity<AssessmentExperienceData> createAssessmentDataExperience(@PathVariable(value = "hostingId") Long hostingId,@RequestBody AssessmentExperienceData assessmentData) {
        Experience hosting = hostingService.findExperienceById(hostingId);
        assessmentData.setExperience(hosting);
        var data = service.save(assessmentData);
        if (isNull(data)) {
            return ResponseEntity.internalServerError().build();
        }
        URI location = URI.create("/create");
        return ResponseEntity.created(location).body(data);
    }
   

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssessmentData(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}")
    public ResponseEntity<AssessmentExperienceData> updateAssessmentData(@PathVariable Long id, @RequestBody AssessmentExperienceData assessmentData) {
        AssessmentExperienceData assessment = service.updateAssessmentData(id, assessmentData);
        if (isNull(assessment)) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok(assessment);
    }
}
