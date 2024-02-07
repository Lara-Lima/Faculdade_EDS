package com.hotelJavali.hotelJavali.domain.converters;

import com.hotelJavali.hotelJavali.domain.models.UserPasswordModel;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.UserData;
import org.modelmapper.ModelMapper;
import jakarta.annotation.Nonnull;
import jakarta.persistence.Convert;
import jakarta.persistence.Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Convert
@Component
@RequiredArgsConstructor
public class UserLoginConverter{
    private final ModelMapper mapper;

    public UserPasswordModel convert(@Nonnull UserData source){
        return mapper.map(source, UserPasswordModel.class);
    }

    public UserData convert(@Nonnull UserPasswordModel source) {
        return mapper.map(source, UserData.class);
    }

}
