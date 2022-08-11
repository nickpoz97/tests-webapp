package org.univr.webapp.model.webappStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "stato")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Status {
    @Data
    @Embeddable
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatoPK implements Serializable {
        @Column(name="timestamptest", nullable = false)
        private LocalDateTime timestampTest;
        @Column(name="nometest", nullable = false)
        private String nomeTest;
        @Column(name="idutente", nullable=false)
        private String idUtente;
        @Column(name="idrisposta", nullable = false)
        private Long idRisposta;
    }

    @EmbeddedId
    private StatoPK statoPK;
}
