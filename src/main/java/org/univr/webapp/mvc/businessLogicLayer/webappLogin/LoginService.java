package org.univr.webapp.mvc.businessLogicLayer.webappLogin;

import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import org.univr.webapp.model.webappLogin.Login;
import org.univr.webapp.model.webappLogin.Role;
import org.univr.webapp.mvc.dataAccessLayer.webappLogin.LoginRepository;
import org.univr.webapp.mvc.presentationLayer.returnMessages.LoginInfo;
import org.univr.webapp.mvc.presentationLayer.returnMessages.MutationResult;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Service
public class LoginService {
    private final LoginRepository loginRepository;
    private final HttpSession httpSession;
    private final HttpServletRequest request;

    @Autowired
    public LoginService(LoginRepository loginRepository, HttpSession httpSession, HttpServletRequest request) {
        this.loginRepository = loginRepository;
        this.httpSession = httpSession;
        this.request = request;
    }


    public LoginInfo login(String username, String password) {
        String hash = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();

        try {
            if (!(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken)) {
                throw new UserAlreadyLoggedException("Questa sessione è gia stata occupata");
            }

            Optional<Login> loginQuery = loginRepository.findById(username);
            Role ruolo = validateLogin(username, hash, loginQuery);
            return new LoginInfo(
                    true,
                    ruolo.name(),
                    "Login avvenuto con successo",
                    httpSession.getId()
            );
        } catch (Exception e) {
            return new LoginInfo(false, null, e.getMessage(), null);
        }
    }

    private Role validateLogin(String username, String password, Optional<Login> loginQuery) {
        if (loginQuery.isPresent()) {
            Login login = loginQuery.get();
            if (login.getPassword().equals(password)) {
                return setAuthentication(username, login, password);
            }
            throw new BadCredentialsException("Password non valida");
        }
        throw new BadCredentialsException("Utente non esistente");
    }

    private Role setAuthentication(String username, Login login, String hash) {
        Role role = Role.valueOf(login.getRole().name());
        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role.name()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, hash, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        httpSession.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
        return role;
    }

    public MutationResult logout() {
        try {
            new SecurityContextLogoutHandler().logout(request, null, null);
        } catch (Exception e) {
            return new MutationResult(false, e.getMessage());
        }
        return new MutationResult(true, "Logout success");
    }
}
