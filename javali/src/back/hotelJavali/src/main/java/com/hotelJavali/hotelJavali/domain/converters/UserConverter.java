package com.hotelJavali.hotelJavali.domain.converters;

import com.hotelJavali.hotelJavali.domain.models.UserModel;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.UserData;
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
public class UserConverter implements Converter<UserData, UserModel> {

    private final ModelMapper mapper;

    @Override
    public UserModel convert(@Nonnull UserData source) {
        return mapper.map(source, UserModel.class);
    }

    public UserData convert(@Nonnull UserModel source) {
        return mapper.map(source, UserData.class);
    }

    // public UserPurchaseModel convertToPurchase(@Nonnull UserData source) {
    //     return mapper.map(source, UserPurchaseModel.class);
    // }

    public List<UserModel> convertModel(@Nonnull List<UserData> items) {
        List<UserModel> userDataList = new ArrayList<>();
        items.forEach(item -> userDataList.add(convert(item)));
        return userDataList;
    }
}