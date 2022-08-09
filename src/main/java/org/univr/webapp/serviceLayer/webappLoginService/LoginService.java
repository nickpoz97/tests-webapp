package org.univr.webapp.serviceLayer.webappLoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.univr.webapp.dataLayer.webappLogin.LoginRepository;
import org.univr.webapp.model.webappLogin.Autorizzazione;
import org.univr.webapp.model.webappLogin.Login;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class LoginService implements UserDetails {
    private final Login login;

    public LoginService(Login login) {
        this.login = login;
    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Login user = loginRepository.findById(username)
//            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//        return User
//            .withUsername(user.getUsername())
//            .password(user.getPassword())
//            .authorities(user.getRuolo().name())
//            .build();
//    }

    @Override
    public List<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(login.getAutorizzazione().name()));
    }

    @Override
    public String getPassword() {
        return login.getPassword();
    }

    @Override
    public String getUsername() {
        return login.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return login.getEnabled();
    }

    @Override
    public boolean isAccountNonLocked() {
        return login.getEnabled();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return login.getEnabled();
    }

    @Override
    public boolean isEnabled() {
        return login.getEnabled();
    }
}
