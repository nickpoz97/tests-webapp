package org.univr.webapp.mvc.presentationLayer.returnMessages;

public record LoginInfo(
    boolean success,
    String role,
    String message,
    String id
) {
}
