package org.univr.webapp.mvc.businessLogicLayer.webappData;

public class TestAlreadyExistingException extends RuntimeException {
    public TestAlreadyExistingException() {
        super("Test con stesso nome e timestamp già esistente");
    }
}
