package com.RealEstateHomes.RealEstateHomes;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication

@ComponentScan(basePackages = "com.RealEstateHomes")
public class RealEstateHomesApplication {


	public static void main(String[] args) {
		SpringApplication.run(RealEstateHomesApplication.class, args);
	}

}
