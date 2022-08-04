package org.univr.webapp.serviceLayer.webappDataService;

import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.language.SourceLocation;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class TestInputFieldException extends RuntimeException implements GraphQLError {
    private final int errorCode;

    public TestInputFieldException(int errorCode, String message){
        this.errorCode = errorCode;
    }

    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public ErrorType getErrorType() {
        return ErrorType.DataFetchingException;
    }

    @Override
    public Map<String, Object> getExtensions() {
        Map<String, Object> customAttributes = new LinkedHashMap<>();

        customAttributes.put("errorCode", this.errorCode);

        return customAttributes;
    }
}
