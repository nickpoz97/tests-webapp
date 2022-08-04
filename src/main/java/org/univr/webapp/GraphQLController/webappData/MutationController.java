package org.univr.webapp.GraphQLController.webappData;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.GraphQLController.webappData.inputTypes.TestInput;
import org.univr.webapp.model.webappData.Test;

@Controller
public class MutationController extends AbstractDataController {
    @MutationMapping
    public Test addTest(@Argument TestInput testInput) {
        return getTestService().insertTest(testInput);
    }
}
