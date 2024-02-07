package com.hotelJavali.hotelJavali.domain.converters;

import com.hotelJavali.hotelJavali.domain.models.AssessmentHostingModel;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.AssessmentHostingData;
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
public class AssessmentHostingConverter implements Converter<AssessmentHostingData, AssessmentHostingModel> {

    private final ModelMapper mapper;

    @Override
    public AssessmentHostingModel convert(@Nonnull AssessmentHostingData source) {
        return mapper.map(source, AssessmentHostingModel.class);
    }

    public AssessmentHostingData convert(@Nonnull AssessmentHostingModel source) {
        return mapper.map(source, AssessmentHostingData.class);
    }

    public List<AssessmentHostingModel> convertModel(@Nonnull List<AssessmentHostingData> items) {
        List<AssessmentHostingModel> assessmentModelList = new ArrayList<>();
        items.forEach(item -> assessmentModelList.add(convert(item)));
        return assessmentModelList;
    }
}
