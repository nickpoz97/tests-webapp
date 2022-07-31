package org.univr.webapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.univr.webapp.model.Test;

public interface TestRepository extends JpaRepository<Test, Test.TestID> {
}
