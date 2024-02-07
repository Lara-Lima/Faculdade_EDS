package com.hotelJavali.hotelJavali.controller;

import com.hotelJavali.hotelJavali.domain.ExperienceService;
import com.hotelJavali.hotelJavali.domain.models.ExperienceModel;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.Experience;

import java.util.List;

import static java.util.Objects.nonNull;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/experience", produces = "application/json")
public class ExperienceController {
    @Autowired
    private final ExperienceService experienceService;

    @GetMapping("/all")
    public ResponseEntity<List<Experience>> getAllExperiences() {
        return ResponseEntity.ok(experienceService.findAll());
    }

    @GetMapping("/byOwner/{idOwner}")
    public ResponseEntity<List<Experience>> findExperiencesByOwner(@PathVariable Long idOwner) {
        try {
            List<Experience> experience = experienceService.findExperiencesByOwner(idOwner);
            if (!experience.isEmpty()) {
                return ResponseEntity.ok(experience);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/byDistinctOwner/{idOwner}")
    public ResponseEntity<List<Experience>> findExperienceByDistinctOwner(@PathVariable Long idOwner) {
        try {
            List<Experience> experience = experienceService.findDistinctExperiencesByOwner(idOwner);
            if (!experience.isEmpty()) {
                return ResponseEntity.ok(experience);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/experience/{experienceId}")
    public ResponseEntity<Experience> findExperienceById(@PathVariable Long experienceId) {
        try {
            Experience experience = experienceService.findExperienceById(experienceId);
            if (nonNull(experience)) {
                return ResponseEntity.ok(experience);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Experience> createExperience(@RequestBody Experience experience) {
        Experience newExperience = experienceService.save(experience);
        return ResponseEntity.status(HttpStatus.CREATED).body(newExperience);
    }

    @DeleteMapping("/{experienceId}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long experienceId) {
        try {
            experienceService.deleteById(experienceId);
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/update/{experienceId}")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long experienceId,
            @RequestBody Experience experience) {
        try {
            Experience experienceUpdated = experienceService.updateExperience(experienceId, experience);
            if (nonNull(experienceUpdated)) {
                return ResponseEntity.ok(experienceUpdated);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Dashboard

    @GetMapping("/experiencePorMes")
    public ResponseEntity<List<Integer>> quantidadeCadastrosAnoAnterior() {
        List<Integer> comprasPorMes = experienceService.quantidadeCadastrosAnoAnterior();
        return ResponseEntity.ok(comprasPorMes);
    }
}