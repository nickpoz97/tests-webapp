package org.univr.webapp.mvc.dataAccessLayer.webappLogin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.graphql.data.GraphQlRepository;
import org.univr.webapp.model.webappLogin.Login;

@GraphQlRepository
public interface LoginRepository extends JpaRepository<Login, String> {

}
