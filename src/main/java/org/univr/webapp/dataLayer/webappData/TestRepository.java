package org.univr.webapp.dataLayer.webappData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.graphql.data.GraphQlRepository;
import org.springframework.stereotype.Repository;
import org.univr.webapp.model.webappData.Test;

@GraphQlRepository
public interface TestRepository extends JpaRepository<Test, Test.TestID> {
}