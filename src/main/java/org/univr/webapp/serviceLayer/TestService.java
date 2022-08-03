package org.univr.webapp.serviceLayer;

import org.springframework.stereotype.Service;
import org.univr.webapp.GraphQLController.inputTypes.TestInput;
import org.univr.webapp.model.Domanda;
import org.univr.webapp.model.Test;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class TestService extends AbstractService{
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

    public Test insertTest(TestInput testInput){
        if (testInput.nomeDomande().isEmpty()){
            throw new TestInputFieldException(1, "Inserire almeno 1 domanda per test");
        }

        List<Domanda> domande = getDomandaRepository().findAllById(testInput.nomeDomande());
        if (domande.size() != testInput.nomeDomande().size()){
            throw new TestInputFieldException(2, "Alcuni dei titoli di domande inseriti non sono esistenti");
        }

        try{
            LocalDateTime data = LocalDateTime.of(
                    testInput.anno(),
                    testInput.mese(),
                    testInput.giornoDelMese(),
                    testInput.ora(),
                    testInput.minuto()
            );

            Test.TestID testID = new Test.TestID(
                    data,
                    testInput.nome()
            );

            Test test = new Test(testID, testInput.ordineCasuale(), testInput.domandeConNumero(), domande);
            getTestRepository().save(test);
            return test;
        }
        catch (DateTimeException e){
            throw new TestInputFieldException(3, "Data errata");
        }
    }

    public List<Test> getAllTests(){
        return getTestRepository().findAll();
    }
}
