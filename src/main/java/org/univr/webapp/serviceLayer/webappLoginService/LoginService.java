package org.univr.webapp.serviceLayer.webappLoginService;

import com.google.common.hash.Hashing;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.univr.webapp.dataLayer.webappLogin.LoginRepository;
import org.univr.webapp.model.webappLogin.Login;
import org.univr.webapp.model.webappLogin.Ruolo;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Service
public class LoginService {
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
}
