package com.hotelJavali.hotelJavali.controller;

import com.hotelJavali.hotelJavali.domain.HostingService;
import com.hotelJavali.hotelJavali.domain.models.HostingModel;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;

import java.util.List;

import static java.util.Objects.nonNull;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/hosting", produces = "application/json")
public class HostingController {
    @Autowired
    private final HostingService hostingService;

    @GetMapping("/all")
    public ResponseEntity<List<Hosting>> getAllHostings() {
        List<Hosting> hostingList = hostingService.findAll();
        return ResponseEntity.ok(hostingList);
    }

    @GetMapping("/byOwner/{idOwner}")
    public ResponseEntity<List<HostingModel>> findHostingsByOwner(@PathVariable Long idOwner) {
        try {
            List<HostingModel> hosting = hostingService.findHostingsByOwner(idOwner);
            if (!hosting.isEmpty()) {
                return ResponseEntity.ok(hosting);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("byDistinctOwner/{idOwner}")
    public ResponseEntity<List<HostingModel>> findHostingByDistinctOwner(@PathVariable Long idOwner) {
        try {
            List<HostingModel> hosting = hostingService.findDistinctHostingsByOwner(idOwner);
            if (!hosting.isEmpty()) {
                return ResponseEntity.ok(hosting);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/hosting/{hostingId}")
    public ResponseEntity<Hosting> findHostingById(@PathVariable Long hostingId) {
        try {
            Hosting hosting = hostingService.findHostingById(hostingId);
            if (nonNull(hosting)) {
                return ResponseEntity.ok(hosting);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/update/{hostingId}")
    public ResponseEntity<Hosting> updateHosting(@PathVariable Long hostingId, @RequestBody Hosting hosting) {
        try {
            Hosting hostingUpdated = hostingService.updateHosting(hostingId, hosting);
            if (nonNull(hostingUpdated)) {
                return ResponseEntity.ok(hostingUpdated);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Hosting> createHosting(@RequestBody Hosting hosting) {
        Hosting newHosting = hostingService.save(hosting);
        return ResponseEntity.status(HttpStatus.CREATED).body(newHosting);
    }

    @DeleteMapping("/{hostingId}")
    public ResponseEntity<Void> deleteHosting(@PathVariable Long hostingId) {
        try {
            hostingService.deleteById(hostingId);
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Dashboard

    @GetMapping("/hostingPorMes")
    public ResponseEntity<List<Integer>> quantidadeCadastrosAnoAnterior() {
        List<Integer> comprasPorMes = hostingService.quantidadeCadastrosAnoAnterior();
        return ResponseEntity.ok(comprasPorMes);
    }
}