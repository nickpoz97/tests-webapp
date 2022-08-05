package org.univr.webapp.serviceLayer.webappLoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.univr.webapp.dataLayer.webappLogin.LoginRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoginService { //implements UserDetailsService {
    private final LoginRepository loginRepository;

    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
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
}
