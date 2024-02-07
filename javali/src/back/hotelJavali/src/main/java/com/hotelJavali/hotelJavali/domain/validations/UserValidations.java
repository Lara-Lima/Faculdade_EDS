package com.hotelJavali.hotelJavali.domain.validations;

import com.hotelJavali.hotelJavali.domain.models.UserModel;
import org.springframework.stereotype.Component;
@Component
public class UserValidations {
    public void validate(UserModel userModel) {
        if(userModel.getName() != null) {
            userModel.setName(userModel.getName());
        }
        if(userModel.getPhone() != null) {
            userModel.setPhone(userModel.getPhone());
        }
        if(userModel.getBirthDate() != null) {
            userModel.setBirthDate(userModel.getBirthDate());
        }
        if(userModel.getEmail() != null) {
            userModel.setEmail(userModel.getEmail());
        }
        if(userModel.getPassword() != null) {
            userModel.setPassword(userModel.getPassword());
        }
        if(userModel.getAddress() != null) {
            userModel.setAddress(userModel.getAddress());
        }
    }
}