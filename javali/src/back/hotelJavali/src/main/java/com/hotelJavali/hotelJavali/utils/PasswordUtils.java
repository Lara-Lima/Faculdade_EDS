package com.hotelJavali.hotelJavali.utils;

import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.RandomStringUtils;

@UtilityClass
public class PasswordUtils {

    public static String randomPass() {
        return RandomStringUtils.randomAlphabetic(6);
    }
}