package org.univr.webapp.mvc.businessLogicLayer.webappLogin;

public class UserAlreadyLoggedException extends RuntimeException {
    public UserAlreadyLoggedException(String message) {
        super(message);
    }
}
