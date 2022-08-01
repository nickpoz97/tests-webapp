package org.univr.webapp.GraphQLController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.GraphQLController.returnMessages.TestInsertionMessage;
import org.univr.webapp.Repository.DomandaRepository;
import org.univr.webapp.Repository.RispostaRepository;
import org.univr.webapp.Repository.TestRepository;
import org.univr.webapp.model.Domanda;
import org.univr.webapp.model.Test;

import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.util.List;

@Controller
public class MutationController {
    private final TestRepository testRepository;
    private final DomandaRepository domandaRepository;
    private final RispostaRepository rispostaRepository;

    @Autowired
    public MutationController(TestRepository testRepository, DomandaRepository domandaRepository, RispostaRepository rispostaRepository) {
        this.testRepository = testRepository;
        this.domandaRepository = domandaRepository;
        this.rispostaRepository = rispostaRepository;
    }

    record TestInput(
        int giornoDelMese,
        int mese,
        int anno,
        int ora,
        int minuto,
        String nome,
        boolean ordineCasuale,
        boolean domandeConNumero,
        List<String> nomeDomande
    ) {}
    @MutationMapping
    public TestInsertionMessage addTest(@Argument TestInput testInput){
        if (testInput.nomeDomande.isEmpty()){
            return TestInsertionMessage.NO_QUESTIONS;
        }

        List<Domanda> domande = domandaRepository.findAllById(testInput.nomeDomande());
        if (domande.size() != testInput.nomeDomande.size()){
            return TestInsertionMessage.NOT_EXISTING_QUESTION;
        }

        LocalDateTime data;
        try{
            data = LocalDateTime.of(
                    testInput.anno,
                    testInput.mese,
                    testInput.giornoDelMese,
                    testInput.ora,
                    testInput.minuto
            );
        }
        catch (DateTimeException e){
            return TestInsertionMessage.ILLEGAL_DATE_TIME;
        }

        Test.TestID testID = new Test.TestID(
            data,
            testInput.nome
        );

        Test test = new Test(testID, testInput.ordineCasuale, testInput.domandeConNumero, domande);
        testRepository.save(test);

        return TestInsertionMessage.OK;
    }
}
