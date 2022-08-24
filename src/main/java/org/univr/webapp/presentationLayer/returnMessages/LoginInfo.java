package org.univr.webapp.presentationLayer.returnMessages;

public record LoginInfo(
    boolean success,
    String role,
    String message,
    String id
) {
}
