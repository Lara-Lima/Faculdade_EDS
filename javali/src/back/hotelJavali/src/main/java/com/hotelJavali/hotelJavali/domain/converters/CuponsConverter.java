package com.hotelJavali.hotelJavali.domain.converters;

import com.hotelJavali.hotelJavali.domain.models.CuponsModel;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Cupons;
import org.modelmapper.ModelMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Convert;
import lombok.RequiredArgsConstructor;


import java.util.ArrayList;
import java.util.List;
@Convert
@Component
@RequiredArgsConstructor
public class CuponsConverter implements Converter<Cupons, CuponsModel>{

    private final ModelMapper mapper;

    @Override
    public CuponsModel convert(@Nonnull Cupons source) {
        return mapper.map(source, CuponsModel.class);
    }

    public Cupons convert(@Nonnull CuponsModel source) {
        return mapper.map(source, Cupons.class);
    }

    public List<CuponsModel> convertToModel(@Nonnull List<Cupons> items) {
        List<CuponsModel> cuponsModelList = new ArrayList<>();
        items.forEach(item -> cuponsModelList.add(convert(item)));
        return cuponsModelList;
    }
}