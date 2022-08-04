package org.univr.webapp.serviceLayer.webappLoginService;

import com.google.common.hash.Hashing;
import lombok.NoArgsConstructor;
import lombok.extern.java.Log;
import net.bytebuddy.build.Plugin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.MessageDigestPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.univr.webapp.dataLayer.webappLogin.LoginRepository;
import org.univr.webapp.model.webappLogin.Login;
import org.univr.webapp.model.webappLogin.Ruolo;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LoginService { //implements UserDetailsService {
    private final LoginRepository loginRepository;

    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public Ruolo getRuolo(String username, String password){
        String shasum = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();

        Optional<Login> result = loginRepository.findById(username)
                .filter(login -> login.getPassword().equals(shasum));

        return result.map(Login::getRuolo).orElse(null);
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

    public List<UserDetails> getAllUsers(){
        List<UserDetails> users = loginRepository.findAll().stream()
            .map(
                usr -> User
                .withDefaultPasswordEncoder()
                .username(usr.getUsername())
                .password(usr.getPassword())
                .roles(usr.getRuolo().toString())
                .build())
            .collect(Collectors.toList());

        return users;
    }
}
