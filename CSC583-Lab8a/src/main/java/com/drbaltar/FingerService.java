package com.drbaltar;

import java.io.IOException;

public class FingerService {

    private final int FINGER_PORT = 79;
    private final String CRLF = "\r\n";
    private final ServerInterface server;


    public FingerService(String host) throws IOException {
        server = new ServerConnection(host, FINGER_PORT);
    }

    public FingerService(ServerInterface server) {
        this.server = server;
    }

    public String queryHost(String query) throws IOException {
        final var formattedQuery = formatQueryToFingerSpecs(query);
        return server.sendMessage(formattedQuery);
    }

    public String queryHost(String[] queryArray) throws IOException {
        StringBuilder response = new StringBuilder();

        if (queryArray.length== 0)
            sendBlankQuery(response);
        else
            sendInputQueries(queryArray, response);

        return response.toString();
    }

    private void sendBlankQuery(StringBuilder query) throws IOException {
        query.append(queryHost(CRLF));
    }

    private void sendInputQueries(String[] queryArray, StringBuilder query) throws IOException {
        for (int i = 0; i < queryArray.length; i++)
            query.append(queryHost(queryArray[i]) + "\n");
    }

    private String formatQueryToFingerSpecs(String query) {
        return query.replaceAll("[^\\p{ASCII}]", "") + CRLF;
    }
}
