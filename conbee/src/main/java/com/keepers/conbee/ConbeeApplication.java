package com.keepers.conbee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

// 스케쥴러 동작위한 어노테이션
@EnableScheduling
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class ConbeeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConbeeApplication.class, args);
	}

}
