package org.univr.webapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.univr.webapp.model.Test;

@Repository
public interface TestRepository extends JpaRepository<Test, Test.TestID> {
}
