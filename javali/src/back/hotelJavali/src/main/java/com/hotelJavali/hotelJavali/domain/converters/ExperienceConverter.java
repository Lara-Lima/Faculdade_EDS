package com.hotelJavali.hotelJavali.domain.converters;

import org.modelmapper.ModelMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.hotelJavali.hotelJavali.domain.models.ExperienceModel;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.Experience;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Convert;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Convert
@Component
@RequiredArgsConstructor
public class ExperienceConverter implements Converter<Experience, ExperienceModel> {

    private final ModelMapper mapper;

    @Override
    public ExperienceModel convert(@Nonnull Experience source) {
        return mapper.map(source, ExperienceModel.class);
    }

    public Experience convertToData(@Nonnull ExperienceModel source) {
        return mapper.map(source, Experience.class);
    }

    public List<ExperienceModel> convertToModel(@Nonnull List<Experience> items) {
        List<ExperienceModel> experienceModelList = new ArrayList<>();
        items.forEach(item -> experienceModelList.add(convert(item)));
        return experienceModelList;
    }
}
