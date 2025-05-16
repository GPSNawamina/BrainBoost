package com.brainboost.config;

import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableWebSecurity
public class HealthCheckConfig {

    @Bean
    @Order(3)
    public SecurityFilterChain healthCheckSecurityFilterChain(HttpSecurity http, HandlerMappingIntrospector introspector) throws Exception {
        MvcRequestMatcher.Builder mvc = new MvcRequestMatcher.Builder(introspector).servletPath("/");
        
        http
            .securityMatcher(mvc.pattern("/actuator/**"))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(mvc.pattern("/actuator/health/**")).permitAll()
                .requestMatchers(mvc.pattern("/actuator/info")).permitAll()
                .anyRequest().authenticated()
            )
            .csrf(csrf -> csrf.disable());
        
        return http.build();
    }
} 