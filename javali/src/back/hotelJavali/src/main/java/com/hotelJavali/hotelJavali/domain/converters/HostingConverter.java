package com.hotelJavali.hotelJavali.domain.converters;

import org.modelmapper.ModelMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import com.hotelJavali.hotelJavali.domain.models.HostingModel;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Hosting;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Convert;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Convert
@Component
@RequiredArgsConstructor
public class HostingConverter implements Converter<Hosting, HostingModel>{

    private final ModelMapper mapper;

    @Override
    public HostingModel convert(@Nonnull Hosting source) {
        HostingModel hostingModel = mapper.map(source, HostingModel.class);
        return hostingModel;
    }

    public Hosting convertToData(@Nonnull HostingModel source) {
        return mapper.map(source, Hosting.class);
    }

    public List<HostingModel> convertToModel(@Nonnull List<Hosting> items) {
        List<HostingModel> hostingModelList = new ArrayList<>();
        items.forEach(item -> hostingModelList.add(convert(item)));
        return hostingModelList;
    }

}