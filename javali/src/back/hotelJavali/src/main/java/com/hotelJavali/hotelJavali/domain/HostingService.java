
package com.hotelJavali.hotelJavali.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hotelJavali.hotelJavali.domain.converters.HostingConverter;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.ImageHosting;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Purchase;
import com.hotelJavali.hotelJavali.infrastructure.repositories.HostingRepository;

import jakarta.transaction.Transactional;

import com.hotelJavali.hotelJavali.domain.models.HostingModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HostingService {
    private final HostingRepository repository;
    private final HostingConverter converter;
    private final ImageHostingService imageService;

    public List<Hosting> findAll() {
        List<Hosting> hostingList = repository.findAll();
        return hostingList;
    }

    public List<HostingModel> findHostingsByOwner(Long idOwner) {
        List<Hosting> hostingList = repository.findAll().stream()
                .filter(h -> h.getUserId() != null && h.getUserId().equals(idOwner))
                .collect(Collectors.toList());

        return converter.convertToModel(hostingList);
    }

    public List<HostingModel> findDistinctHostingsByOwner(Long idOwner) {
        List<Hosting> hostingList = repository.findAll().stream()
                .filter(h -> h.getUserId() != null && !h.getUserId().equals(idOwner))
                .collect(Collectors.toList());

        return converter.convertToModel(hostingList);
    }

    public List<Hosting> findDistinctHostingsByOwner2(Long idOwner) {
        List<Hosting> hostingList = repository.findAll().stream()
                .filter(h -> h.getUserId() != null && !h.getUserId().equals(idOwner))
                .collect(Collectors.toList());

        return hostingList;
    }

    public Hosting findHostingById(Long hostingId) {
        Optional<Hosting> hosting = repository.findById(hostingId);
        return hosting.orElseThrow(() -> new RuntimeException("Hosting does not exist."));
    }

    @Transactional
    public Hosting updateHosting(Long hostingId, Hosting updatedHosting) {
        Optional<Hosting> existingHostingOptional = repository.findById(hostingId);

        if (existingHostingOptional.isPresent()) {
            Hosting existingHosting = existingHostingOptional.get();

            existingHosting.setTitle(updatedHosting.getTitle());
            existingHosting.setDescription(updatedHosting.getDescription());
            existingHosting.setRoomsQuantity(updatedHosting.getRoomsQuantity());
            existingHosting.setBathroomsQuantity(updatedHosting.getBathroomsQuantity());
            existingHosting.setRentPrice(updatedHosting.getRentPrice());
            existingHosting.setHostingArea(updatedHosting.getHostingArea());
            existingHosting.setMaxCapacity(updatedHosting.getMaxCapacity());
            existingHosting.setCheckIn(updatedHosting.getCheckIn());
            existingHosting.setCheckOut(updatedHosting.getCheckOut());
            // existingExperience.setImages(updatedExperience.getImages());

            // existingHosting.setImages(updatedHosting.getImages());
            if (updatedHosting.getImages().size() > 0) {
                existingHosting.getImages().clear();
            }
            final List<ImageHosting> images = updatedHosting.getImages().stream().map(image -> {
                image.setHosting(existingHosting);
                ImageHosting imageSaved = imageService.save(image);
                return imageSaved;
            }).collect(Collectors.toList());
            existingHosting.getImages().addAll(images);

            return repository.save(existingHosting);
        } else {
            throw new RuntimeException("Hosting not found with ID: " + hostingId);
        }
    }

    @Transactional
    public Hosting save(Hosting hosting) {
        if (hosting.getImages().size() > 0) {
            hosting.setImages(
                    hosting.getImages().stream().map(image -> {
                        image.setHosting(hosting);
                        ImageHosting imageSaved = imageService.save(image);
                        return imageSaved;
                    }).collect(Collectors.toList()));
        }
        return repository.save(hosting);
    }

    @Transactional
    public void deleteById(Long hostingId) {
        try {
            repository.deleteById(hostingId);
        } catch (Exception e) {
            throw new RuntimeException("It's not possible to delete this hosting.");
        }
    }

    // Dashboard

    public List<Integer> cadastroAnual() {
        List<Integer> cadastroAnual = repository
                .findAll().stream().map(Hosting::getDateHosting).map(data -> data.getYear())
                .collect(Collectors.toList());
        return cadastroAnual;
    }

    public Integer quantidadeCadastroProdutosMes(Long mes) {
        long count = repository.findAll()
                .stream()
                .filter(h -> h.getDateHosting().getMonth().getValue() == mes)
                .count();

        return Math.toIntExact(count);
    }

    public List<Integer> quantidadeCadastrosAnoAnterior() {
        List<Integer> quantidadeCadastrosAnoAnterior = new ArrayList<>();

        for (int i = 1; i <= 12; i++) {
            quantidadeCadastrosAnoAnterior.add(quantidadeCadastroProdutosMes((long) i));
        }

        return quantidadeCadastrosAnoAnterior;
    }

}
