package com.drbaltar;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class ServerConnectionTest {

    ServerConnection connection;

    @BeforeEach
    void setUp() throws IOException {
        connection = new ServerConnection("directory.purdue.edu", 79);
    }

    @Test
    void shouldSuccessfullySendsAMessageAndReceivesResponse() throws Exception {
        assertTrue(connection.sendMessage("Smart\r\n").startsWith("\nOutput of your query: Smart"));
    }
}
