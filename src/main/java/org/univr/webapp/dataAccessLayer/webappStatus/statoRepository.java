package org.univr.webapp.dataAccessLayer.webappStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.graphql.data.GraphQlRepository;
import org.univr.webapp.model.webappStatus.Stato;

@GraphQlRepository
public interface statoRepository extends JpaRepository<Stato, Stato.StatoPK> {
}
