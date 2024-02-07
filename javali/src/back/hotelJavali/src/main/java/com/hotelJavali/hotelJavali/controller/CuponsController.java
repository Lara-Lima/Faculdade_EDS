package com.hotelJavali.hotelJavali.controller;

import com.hotelJavali.hotelJavali.domain.AssessmentHostingService;
import com.hotelJavali.hotelJavali.domain.CuponsService;
import com.hotelJavali.hotelJavali.domain.HostingService;
import com.hotelJavali.hotelJavali.domain.models.CuponsModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.AssessmentHostingData;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Cupons;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;

import java.net.URI;
import java.util.List;
import static java.util.Objects.nonNull;
import static java.util.Objects.isNull;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/cupom", produces = "application/json")
public class CuponsController {
    @Autowired
    private final CuponsService cupomService;
    private final HostingService hostingService;

    @GetMapping("/all")
    public ResponseEntity<List<CuponsModel>> getAllCupons() {
        return ResponseEntity.ok(cupomService.findAll());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> cuponsParaUsuarioDeAcordoComCompras(@PathVariable Long userId) {
        try {
            if (userId == null) {
                return ResponseEntity.badRequest().body("ID de usuário é obrigatório.");
            }

            List<Cupons> cupons = cupomService.cuponsByCategory2ByUser(userId);

            if (cupons.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(cupons);
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/hosting/{hostingId}")
    public ResponseEntity<?> getCuponsByHostingId(@PathVariable Long hostingId) {
        try {
            if (hostingId == null) {
                return ResponseEntity.badRequest().body("ID de hosting é obrigatório.");
            }

            List<Cupons> cupons = cupomService.findCuponsByHostingId(hostingId);

            if (cupons.isEmpty()) {
                return ResponseEntity.badRequest().body("Cupom não encontrado!");
            }

            return ResponseEntity.ok(cupons);
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{cupomId}")
    public ResponseEntity<Cupons> findCupomById(@PathVariable Long cupomId) {
        try {
            Cupons cupom = cupomService.findCupomById(cupomId);
            if (nonNull(cupom)) {
                return ResponseEntity.ok(cupom);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/codigo/{cupomId}/userId/{userId}")
    public ResponseEntity<Cupons> findCupomByCodigo(@PathVariable String cupomId, @PathVariable Long userId) {
        try {
            Cupons cupom = cupomService.findCupomByCodigo(cupomId, userId);
            if (nonNull(cupom)) {
                return ResponseEntity.ok(cupom);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user/{userId}/hosting/{hostingId}")
    public ResponseEntity<?> getCuponsByUserAndHostingId(
            @PathVariable Long userId,
            @PathVariable Long hostingId) {
        try {
            if (userId == null || hostingId == null) {
                return ResponseEntity.badRequest().body("IDs de usuário e hosting são obrigatórios.");
            }

            List<Cupons> cupons = cupomService.findCuponsByUserAndHostingId(userId, hostingId);

            if (cupons.isEmpty()) {
                return ResponseEntity.badRequest().body("Cupom não encontrado!");
            }

            return ResponseEntity.ok(cupons);
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/create/{hostingId}")
    public ResponseEntity<Cupons> createAssessmentDataHosting(@PathVariable(value = "hostingId") Long hostingId,
            @RequestBody Cupons cupom) {
        Hosting hosting = hostingService.findHostingById(hostingId);
        cupom.setHosting(hosting);
        var data = cupomService.save(cupom);
        if (isNull(data)) {
            return ResponseEntity.internalServerError().build();
        }
        URI location = URI.create("/create");
        return ResponseEntity.created(location).body(data);
    }

    @PostMapping
    public ResponseEntity<Cupons> createCupom(@RequestBody Cupons cupom) {
        try {
            var createdCupom = cupomService.save(cupom);
            if (nonNull(createdCupom)) {
                return ResponseEntity.created(URI.create("/cupom/create")).body(createdCupom);
            }
            return ResponseEntity.internalServerError().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{cupomId}")
    public ResponseEntity<Void> deleteCupom(@PathVariable Long cupomId) {
        try {
            cupomService.deleteById(cupomId);
            return ResponseEntity.noContent().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/{cupomId}")
    public ResponseEntity<Cupons> toggleCupomDisponibilidade(@PathVariable Long cupomId) {
        try {
            if (cupomId == null) {
                return ResponseEntity.badRequest().build();
            }

            Cupons cupomExistente = cupomService.findCupomById(cupomId);

            if (cupomExistente == null) {
                return ResponseEntity.notFound().build();
            }

            cupomExistente.setDisponivel(!cupomExistente.isDisponivel());

            Cupons cupomAtualizadoNoBanco = cupomService.save(cupomExistente);

            return ResponseEntity.ok(cupomAtualizadoNoBanco);
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

}