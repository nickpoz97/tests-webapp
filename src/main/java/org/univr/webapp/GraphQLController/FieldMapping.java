package org.univr.webapp.GraphQLController;

import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.univr.webapp.model.Domanda;
import org.univr.webapp.model.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Controller
public class FieldMapping {
    @SchemaMapping
    public List<Test> tests(Domanda domanda){
        return domanda.getTestList();
    }

    @SchemaMapping
    public String nome(Test test){
        return test.getTestID().getNome();
    }

    @SchemaMapping
    public LocalDate data(Test test){
        return test.getTestID().getData().toLocalDate();
    }

    @SchemaMapping
    public LocalTime orario(Test test){
        return test.getTestID().getData().toLocalTime();
    }

    @SchemaMapping
    public List<Domanda> domande(Test test){
        return test.getDomandeList();
    }
}
