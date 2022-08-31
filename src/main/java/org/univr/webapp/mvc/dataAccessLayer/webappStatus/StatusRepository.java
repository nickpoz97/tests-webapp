package org.univr.webapp.mvc.dataAccessLayer.webappStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.graphql.data.GraphQlRepository;
import org.univr.webapp.model.webappStatus.Status;

@GraphQlRepository
public interface StatusRepository extends JpaRepository<Status, Status.StatoPK> {
}
