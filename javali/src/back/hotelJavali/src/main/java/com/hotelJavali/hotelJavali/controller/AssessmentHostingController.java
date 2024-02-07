package com.hotelJavali.hotelJavali.controller;

import com.hotelJavali.hotelJavali.domain.AssessmentHostingService;
import com.hotelJavali.hotelJavali.domain.HostingService;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.AssessmentHostingData;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;

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
    value = "/api/assessmentHosting",
        consumes = "application/json",
        produces = "application/json")
public class AssessmentHostingController {

    @Autowired
    
    private final AssessmentHostingService service;
    private final HostingService hostingService;


    @GetMapping("/all")
    public ResponseEntity<List<AssessmentHostingData>> getAllAssessments() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentHostingData> getAssessmentById(@PathVariable Long id) {
        try {
            AssessmentHostingData model = service.findById(id);
            if (nonNull(model)) {
                return ResponseEntity.ok(model);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/create/{hostingId}")
    public ResponseEntity<AssessmentHostingData> createAssessmentDataHosting(@PathVariable(value = "hostingId") Long hostingId,@RequestBody AssessmentHostingData assessmentData) {
        Hosting hosting = hostingService.findHostingById(hostingId);
        assessmentData.setHosting(hosting);
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
    public ResponseEntity<AssessmentHostingData> updateAssessmentData(@PathVariable Long id, @RequestBody AssessmentHostingData assessmentData) {
        AssessmentHostingData assessment = service.updateAssessmentData(id, assessmentData);
        if (isNull(assessment)) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok(assessment);
    }
}
