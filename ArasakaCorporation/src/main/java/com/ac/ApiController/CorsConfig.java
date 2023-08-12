package com.ac.ApiController;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("https://lehoangkhai.click/","https://arasaka-qwp0.onrender.com/") // Cho phép truy cập từ tên miền này
//                        .allowedMethods("GET", "POST", "PUT", "DELETE")
//                        .allowedHeaders("*","multipart/form-data")
//                        .allowCredentials(true);
//            }
        	
        	@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("*").allowedHeaders("*");
			}
        };
    }
}
