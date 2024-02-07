package com.hotelJavali.hotelJavali.domain.converters;

import com.hotelJavali.hotelJavali.domain.models.AssessmentExperienceModel;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.AssessmentExperienceData;
import jakarta.annotation.Nonnull;
import jakarta.persistence.Convert;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Convert
@Component
@RequiredArgsConstructor
public class AssessmentExperienceConverter implements Converter<AssessmentExperienceData, AssessmentExperienceModel> {

    private final ModelMapper mapper;

    @Override
    public AssessmentExperienceModel convert(@Nonnull AssessmentExperienceData source) {
        return mapper.map(source, AssessmentExperienceModel.class);
    }

    public AssessmentExperienceData convert(@Nonnull AssessmentExperienceModel source) {
        return mapper.map(source, AssessmentExperienceData.class);
    }

    public List<AssessmentExperienceModel> convertModel(@Nonnull List<AssessmentExperienceData> items) {
        List<AssessmentExperienceModel> assessmentModelList = new ArrayList<>();
        items.forEach(item -> assessmentModelList.add(convert(item)));
        return assessmentModelList;
    }
}
