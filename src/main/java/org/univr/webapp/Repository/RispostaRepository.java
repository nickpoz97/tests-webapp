package org.univr.webapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.univr.webapp.model.Risposta;

@Repository
public interface RispostaRepository extends JpaRepository<Risposta, Long> {
}
