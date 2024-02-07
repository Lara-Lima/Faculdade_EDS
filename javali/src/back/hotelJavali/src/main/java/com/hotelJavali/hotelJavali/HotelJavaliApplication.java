package com.hotelJavali.hotelJavali;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.hotelJavali.hotelJavali.infrastructure.models.entities")
public class HotelJavaliApplication {
	public static void main(String[] args) {
		SpringApplication.run(HotelJavaliApplication.class, args);
	}
}