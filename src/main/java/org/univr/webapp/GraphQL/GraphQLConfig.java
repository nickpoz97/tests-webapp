package org.univr.webapp.GraphQL;

import graphql.scalars.ExtendedScalars;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

@Configuration
public class GraphQLConfig {
    @Bean
    RuntimeWiringConfigurer runtimeWiringConfigurer(){
        return builder -> builder
            .scalar(ExtendedScalars.GraphQLBigDecimal)
            .scalar(ExtendedScalars.GraphQLLong)
            .scalar(ExtendedScalars.LocalTime)
            .scalar(ExtendedScalars.Date);
    }
}
