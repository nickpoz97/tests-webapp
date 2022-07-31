package org.univr.webapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.univr.webapp.model.Domanda;

@Repository
public interface DomandaRepository extends JpaRepository<Domanda, String> {
}
