package org.univr.webapp.dataAccessLayer.webappData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.graphql.data.GraphQlRepository;
import org.univr.webapp.model.webappData.Domanda;

@GraphQlRepository
public interface DomandaRepository extends JpaRepository<Domanda, String> {
}
