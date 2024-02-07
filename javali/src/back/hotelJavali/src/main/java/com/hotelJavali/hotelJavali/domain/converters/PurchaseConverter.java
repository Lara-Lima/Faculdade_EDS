package com.hotelJavali.hotelJavali.domain.converters;

import org.modelmapper.ModelMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.hotelJavali.hotelJavali.domain.models.PurchaseModel;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Purchase;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Convert;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Convert
@Component
@RequiredArgsConstructor
public class PurchaseConverter implements Converter<Purchase, PurchaseModel>{

    private final ModelMapper mapper;

    @Override
    public PurchaseModel convert(@Nonnull Purchase source) {return mapper.map(source, PurchaseModel.class);}

    public Purchase convertToData(@Nonnull PurchaseModel source) {
        return mapper.map(source, Purchase.class);
    }

    public List<PurchaseModel> convertToModel(@Nonnull List<Purchase> items) {
        List<PurchaseModel> purchaseModelList = new ArrayList<>();
        items.forEach(item -> purchaseModelList.add(convert(item)));
        return purchaseModelList;
    }
}
