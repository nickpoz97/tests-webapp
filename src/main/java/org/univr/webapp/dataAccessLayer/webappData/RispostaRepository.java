package org.univr.webapp.dataAccessLayer.webappData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.graphql.data.GraphQlRepository;
import org.univr.webapp.model.webappData.Risposta;

@GraphQlRepository
public interface RispostaRepository extends JpaRepository<Risposta, Long> {
}
