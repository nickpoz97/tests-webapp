package org.univr.webapp.serviceLayer.webappDataService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.univr.webapp.GraphQLController.webappData.inputTypes.TestInput;
import org.univr.webapp.GraphQLController.webappData.returnMessages.MutationResult;
import org.univr.webapp.model.webappData.Domanda;
import org.univr.webapp.model.webappData.Test;

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

/*    public TestInsertionMessage insertTest(TestInput testInput){
        if (testInput.nomeDomande().isEmpty()){
            return TestInsertionMessage.NO_QUESTIONS;
        }

        List<Domanda> domande = appContext.getBean(DomandaRepository.class).findAllById(testInput.nomeDomande());
        if (domande.size() != testInput.nomeDomande().size()){
            return TestInsertionMessage.NOT_EXISTING_QUESTION;
        }

        LocalDateTime data;
        try{
            data = LocalDateTime.of(
                    testInput.anno(),
                    testInput.mese(),
                    testInput.giornoDelMese(),
                    testInput.ora(),
                    testInput.minuto()
            );
        }
        catch (DateTimeException e){
            return TestInsertionMessage.ILLEGAL_DATE_TIME;
        }

        Test.TestID testID = new Test.TestID(
                data,
                testInput.nome()
        );

        Test test = new Test(testID, testInput.ordineCasuale(), testInput.domandeConNumero(), domande);
        appContext.getBean(TestRepository.class).save(test);

        return TestInsertionMessage.OK;
    }*/

    public MutationResult insertTest(TestInput testInput){
        if (testInput.nomeDomande().isEmpty()){
            return new MutationResult(false, "Inserire almeno 1 domanda per test");
        }

        List<Domanda> domande = getDomandaRepository().findAllById(testInput.nomeDomande());
        if (domande.size() != testInput.nomeDomande().size()){
            return new MutationResult(false, "Alcuni dei titoli di domande inseriti non sono esistenti");
        }

        try{
            LocalDateTime data = LocalDateTime.of(
                    testInput.anno(),
                    testInput.mese(),
                    testInput.giornoDelMese(),
                    testInput.ora(),
                    testInput.minuto()
            );

            Test test = new Test(
                    data, testInput.nome(),
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

    @PreAuthorize("hasAnyAuthority('INSEGNANTE')")
    public List<Test> getAllTests(){
        return getTestRepository().findAll();
    }

    @PreAuthorize("hasAnyAuthority('STUDENTE', 'INSEGNANTE')")
    public Optional<Test> getTestById(LocalDate data, LocalTime orario, String nome){
        return getTestRepository().findById(
                new Test.TestID(LocalDateTime.of(data, orario), nome)
        );
    }
}
