package org.univr.webapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeRequests(requests -> requests.anyRequest().permitAll())
            //.authorizeRequests(requests -> requests.anyRequest().authenticated())
            .httpBasic(withDefaults())
            .build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService(){
        UserDetails user =
            User
                .withDefaultPasswordEncoder()
                .username("nick")
                .password("psw")
                .roles("INSEGNANTE")
                .build();
        return new InMemoryUserDetailsManager(user);
    }
}
