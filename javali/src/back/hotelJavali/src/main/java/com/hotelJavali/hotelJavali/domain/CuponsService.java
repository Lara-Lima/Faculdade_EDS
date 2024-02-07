package com.hotelJavali.hotelJavali.domain;

import com.hotelJavali.hotelJavali.domain.converters.CuponsConverter;
import com.hotelJavali.hotelJavali.domain.models.CuponsModel;
import com.hotelJavali.hotelJavali.infrastructure.repositories.CuponsRepository;
import com.hotelJavali.hotelJavali.infrastructure.repositories.PurchaseRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.hotelJavali.hotelJavali.infrastructure.models.entities.Cupons;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Purchase;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class CuponsService {

    private final CuponsRepository cupomRepository;
    private final CuponsConverter converter;
    private final PurchaseRepository purchaseRepository;

    public List<CuponsModel> findAll() {
        List<Cupons> cuponsList = cupomRepository.findAll();
        return converter.convertToModel(cuponsList);
    }

    public List<Cupons> cuponsByCategory2ByUser(Long userId) {
        List<Cupons> cuponsList = cupomRepository.findAll().stream()
                .filter(cupom -> cupom.getUserId().equals(userId) && cupom.getCategoria().equals(2))
                .toList();
        return cuponsList;
    }

    public void generateUserCouponByTenPurchases(Long userId) {
        List<Cupons> cuponsList = cupomRepository.findAll().stream()
                .filter(cupom -> cupom.getUserId().equals(userId) && cupom.getCategoria().equals(2))
                .toList();
        List<Purchase> purchaseList = purchaseRepository.findByBuyerId(userId);
        Long quantidadeDeCompraPorUsuario = (long) purchaseList.size();

        if (quantidadeDeCompraPorUsuario > 0) {
            int cuponsGerados = (int) (quantidadeDeCompraPorUsuario / 10);

            for (int i = 0; i < cuponsGerados; i++) {
                final int index = i;
                boolean cupomJaExiste = cuponsList.stream().anyMatch(cupom -> {
                    // double desconto = CupomPorQuantidadeDeCompra((long) (index + 1) * 10);
                    final String cupomGerado = "CUPOM" + ((index + 1) * 10);
                    return cupom.getCodDoCupom()
                            .equals(cupomGerado);
                });
                if (!cupomJaExiste) {
                    double desconto = CupomPorQuantidadeDeCompra((long) (i + 1) * 10);

                    Cupons cupom = new Cupons();
                    Long cupomId = ThreadLocalRandom.current().nextLong(1_000_000_000L);
                    cupom.setCupomId(cupomId);
                    // cupom.setCodDoCupom(desconto + "CUPOM" + ((i + 1) * 10) + "COMPRA");
                    cupom.setDesconto(desconto);
                    cupom.setCategoria(2);
                    cupom.setTitulo("Parabéns pela(s) " + ((i + 1) * 10) + " compra(s)!");
                    cupom.setUserId(userId);
                    cupom.setDisponivel(true);
                    cupom.setCodDoCupom("CUPOM" + ((i + 1) * 10));

                    cupom.setPurchase(null);
                    LocalDate dataCriacao = LocalDate.now();
                    LocalDate dataExpiracao = dataCriacao.plus(1, ChronoUnit.WEEKS);
                    cupom.setDataExpiracao(dataExpiracao);
                    cupomRepository.save(cupom);
                }
            }
        }
    }

    public List<Cupons> cuponsParaUsuarioDeAcordoComCompras(Long id) {
        List<Purchase> purchaseList = purchaseRepository.findByBuyerId(id);
        List<Cupons> cuponsParaUsuario = new ArrayList<>();

        Long quantidadeDeCompraPorUsuario = (long) purchaseList.size();

        if (quantidadeDeCompraPorUsuario > 0) {
            int cuponsGerados = (int) (quantidadeDeCompraPorUsuario / 10);

            for (int i = 0; i < cuponsGerados; i++) {
                double desconto = CupomPorQuantidadeDeCompra((long) (i + 1) * 10);

                Cupons cupom = new Cupons();
                Long cupomId = ThreadLocalRandom.current().nextLong(1_000_000_000L);
                cupom.setCupomId(cupomId);
                cupom.setCodDoCupom(desconto + "CUPOM" + ((i + 1) * 10) + "COMPRA");
                cupom.setDesconto(desconto);
                cupom.setCategoria(2);
                cupom.setTitulo("Parabéns pela(s) " + ((i + 1) * 10) + " compra(s)!");
                cupom.setUserId(id);
                cupom.setDisponivel(true);
                cupom.setCodDoCupom("CUPOM" + ((i + 1) * 10));

                cupom.setPurchase(null);
                LocalDate dataCriacao = LocalDate.now();
                LocalDate dataExpiracao = dataCriacao.plus(1, ChronoUnit.WEEKS);
                cupom.setDataExpiracao(dataExpiracao);
                cuponsParaUsuario.add(cupom);
            }
        }

        return cuponsParaUsuario;
    }

    public static double CupomPorQuantidadeDeCompra(Long compra) {
        int descontoInicial = 10;
        int aumentoDesconto = 10;

        if (compra <= 0) {
            return 0;
        }

        int intervalo = 50;
        int desconto = descontoInicial + ((int) ((compra - 1) / intervalo)) * aumentoDesconto;
        return Math.min(desconto, 50);
    }

    public List<Cupons> findCuponsByUserId(Long userId) {

        List<Cupons> cuponsList = cupomRepository.findByUserId(userId);
        return cuponsList;
    }

    public List<Cupons> findCuponsByHostingId(Long hostingId) {
        List<Cupons> cuponsList = cupomRepository.findAll().stream()
                .filter(cupom -> cupom.getHosting().getHostingId().equals(hostingId))
                .toList();
        return cuponsList;
    }

    public List<Cupons> findCuponsByUserAndHostingId(Long userId, Long hostingId) {
        List<Cupons> cuponsList = cupomRepository.findAll()
                .stream()
                .filter(cupom -> {
                    Long cupomUserId = cupom.getUserId();
                    Hosting hosting = cupom.getHosting();
                    if (hosting == null) {
                        return false;
                    }
                    Long cupomHostingId = hosting.getHostingId();
                    return cupomUserId.equals(userId)
                            && cupomHostingId.equals(hostingId);
                })
                .toList();
        return cuponsList;
    }

    public Cupons findCupomById(Long cupomId) {
        Optional<Cupons> cupom = cupomRepository.findById(cupomId);
        return cupom.orElseThrow(() -> new RuntimeException("Cupom não existe!"));
    }

    public Cupons findCupomByCodigo(String codigoCupom, Long userId) {

        // cupom por usuario e codigo, filtrar

        Cupons cupomCerto = cupomRepository.findAll().stream()
                .filter(cupom -> cupom.getCodDoCupom().equals(codigoCupom) && cupom.getUserId().equals(userId))
                .findFirst().orElse(null);
        return cupomCerto != null ? cupomCerto : null;
    }

    @Transactional
    public Cupons save(Cupons cupom) {
        return cupomRepository.save(cupom);
    }

    @Transactional
    public void deleteById(Long cupomId) {
        try {
            cupomRepository.deleteById(cupomId);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir esse cupom, pois há entidades relacionadas");
        }
    }
}