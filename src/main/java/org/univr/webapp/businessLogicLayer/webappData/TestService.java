package org.univr.webapp.businessLogicLayer.webappData;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.univr.webapp.model.webappData.Domanda;
import org.univr.webapp.model.webappData.Test;
import org.univr.webapp.presentationLayer.returnMessages.MutationResult;
import org.univr.webapp.presentationLayer.webappData.inputTypes.TestInput;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class TestService extends AbstractDataService {
    public LocalDate getData(Test test){
        return test.getTestID().getData().toLocalDate();
    }

    public LocalTime getOrario(Test test){
        return test.getTestID().getData().toLocalTime();
    }

    public List<Domanda> getDomande(Test test){
        return test.getDomandeList();
    }

    @PreAuthorize("hasAuthority('INSEGNANTE')")
    public MutationResult insertTest(TestInput testInput){
        if (testInput.nomeDomande().isEmpty()){
            return new MutationResult(false, "Inserire almeno 1 domanda per test");
        }

        List<Domanda> domande = getDomandaRepository().findAllById(testInput.nomeDomande());
        if (domande.size() != testInput.nomeDomande().size()){
            return new MutationResult(false, "Alcuni dei titoli di domande inseriti non sono esistenti");
        }

        LocalDateTime timestamp = LocalDateTime.of(testInput.data(), testInput.orario());

        try{
            Test test = new Test(
                    timestamp,
                    testInput.nome(),
                    testInput.ordineCasuale(),
                    testInput.domandeConNumero(),
                    domande
            );
            getTestRepository().save(test);
        }
        catch (DateTimeException e){
            return new MutationResult(false, "Data errata");
        }
        return new MutationResult(true, "Test Aggiunto");
    }

    @PreAuthorize("!isAnonymous()")
    public List<Test> getAllTests(){
        return getTestRepository().findAll();
    }

    @PreAuthorize("!isAnonymous()")
    public Optional<Test> getTestById(LocalDate data, LocalTime orario, String nome){
        return getTestRepository().findById(
                new Test.TestID(LocalDateTime.of(data, orario), nome)
        );
    }
}
