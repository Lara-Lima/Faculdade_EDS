package com.hotelJavali.hotelJavali.domain;

import com.hotelJavali.hotelJavali.domain.converters.UserLoginConverter;
import com.hotelJavali.hotelJavali.domain.models.UserPasswordModel;
import com.hotelJavali.hotelJavali.domain.validations.UserValidations;
import com.hotelJavali.hotelJavali.infrastructure.models.entities.UserData;
import com.hotelJavali.hotelJavali.infrastructure.repositories.UserDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.hotelJavali.hotelJavali.domain.converters.UserConverter;
import com.hotelJavali.hotelJavali.domain.models.UserModel;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserLoginService {
    private final UserDataRepository repository;
    private final UserLoginConverter converter;
    private final UserValidations validations;
    private final UserConverter userConverter;

    public UserPasswordModel findByEmail(String email) {
        UserData userData = repository.findByEmail(email);
        return converter.convert(userData);
    }

    public UserModel findByEmailUser(String email) {
        UserData userData = repository.findByEmail(email);
        return userConverter.convert(userData);
    }
}
