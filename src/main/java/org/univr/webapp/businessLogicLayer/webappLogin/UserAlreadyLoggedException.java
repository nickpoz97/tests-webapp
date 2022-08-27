package org.univr.webapp.businessLogicLayer.webappLogin;

public class UserAlreadyLoggedException extends RuntimeException{
    public UserAlreadyLoggedException(String message) {
        super(message);
    }
}
