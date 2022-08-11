package org.univr.webapp.businessLogicLayer.webappStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.univr.webapp.dataAccessLayer.webappData.RispostaRepository;
import org.univr.webapp.dataAccessLayer.webappData.TestRepository;
import org.univr.webapp.dataAccessLayer.webappStatus.StatusRepository;
import org.univr.webapp.model.webappData.Risposta;
import org.univr.webapp.model.webappData.Test;
import org.univr.webapp.model.webappStatus.Status;
import org.univr.webapp.presentationLayer.webappData.returnMessages.MutationResult;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class StatusService {
    private final StatusRepository statusRepository;
    private final RispostaRepository rispostaRepository;
    private final TestRepository testRepository;

    @Autowired
    public StatusService(StatusRepository statusRepository, TestRepository testRepository, RispostaRepository rispostaRepository, TestRepository testRepository1) {
        this.statusRepository = statusRepository;
        this.rispostaRepository = rispostaRepository;
        this.testRepository = testRepository1;
    }

    @PreAuthorize("hasAnyAuthority('STUDENTE', 'INSEGNANTE')")
    public List<Risposta> getRisposte(String nomeTest, LocalDate data, LocalTime orario){
        List<Long> idRisposte = statusRepository.findAll().stream()
                .filter(s -> userAndTestFilter(s, nomeTest, data, orario))
                .map(s -> s.getStatoPK().getIdRisposta())
                .toList();

        return rispostaRepository.findAllById(idRisposte);
    }

    private boolean userAndTestFilter(Status status, String nomeTest, LocalDate data, LocalTime orario){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Status.StatoPK statusPK = status.getStatoPK();

        return statusPK.getNomeTest().equals(nomeTest) &&
                statusPK.getTimestampTest().equals(LocalDateTime.of(data, orario)) &&
                statusPK.getIdUtente().equals(authentication.getName());
    }

    public MutationResult addRisposta(String nomeTest, LocalDate data, LocalTime orario, Long idRisposta){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LocalDateTime testTimestamp = LocalDateTime.of(data, orario);

        Optional<Risposta> rispostaResult = rispostaRepository.findById(idRisposta);
        Optional<Test> testResult = testRepository.findById(new Test.TestID(testTimestamp, nomeTest));

        if (rispostaResult.isEmpty()){
            return new MutationResult(false, "La risposta con l' id specificato non esiste");
        }

        if(testResult.isEmpty()){
            return new MutationResult(false, "Il test con nome, data e orario specificati non esiste");
        }

        if (!testResult.get().getDomandeList().contains(rispostaResult.get().getDomanda())){
            return new MutationResult(false, "La risposta con l' id specificato non è contenuta in nessuna domanda del test");
        }

        this.statusRepository.save(
                new Status(
                    new Status.StatoPK(
                            testTimestamp,
                            nomeTest,
                            authentication.getName(),
                            idRisposta)
                )
        );
        return new MutationResult(true, "Risposta salvata");
    }
}
