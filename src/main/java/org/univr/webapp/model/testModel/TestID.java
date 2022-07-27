package org.univr.webapp.model.testModel;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Embeddable
public class TestID implements Serializable {
    @Column(name = "data")
    private LocalDateTime data;
    @Column(name = "nome")
    private String nome;
}
