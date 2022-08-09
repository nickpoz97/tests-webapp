package org.univr.webapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.univr.webapp.dataLayer.webappLogin.LoginRepository;
import org.univr.webapp.model.webappLogin.Login;

import java.util.List;
import java.util.Optional;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final LoginRepository loginRepository;
    private final PasswordEncoder pEncoder;

    @Autowired
    public CustomAuthenticationProvider(LoginRepository loginRepository, PasswordEncoder pEncoder) {
        this.loginRepository = loginRepository;
        this.pEncoder = pEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        Optional<Login> login = loginRepository.findById(username);
        if (login.isPresent()) {
            if (pEncoder.matches(password, login.get().getPassword())) {
                return new UsernamePasswordAuthenticationToken(username, password,
                        List.of(new SimpleGrantedAuthority(login.get().getAutorizzazione().name())));
            }else  {
                throw new BadCredentialsException("Invalid password");
            }
        } else {
            throw new BadCredentialsException("No user registered with this details");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
