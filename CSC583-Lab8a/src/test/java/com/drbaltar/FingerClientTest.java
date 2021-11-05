package com.drbaltar;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.io.PrintStream;

import static org.mockito.AdditionalMatchers.and;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.ArgumentMatchers.startsWith;
import static org.mockito.Mockito.verify;

public class FingerClientTest {
    PrintStream outMock;

    @BeforeEach
    void setUp() {
        outMock = Mockito.mock(PrintStream.class);
        System.setOut(outMock);
    }

    @Test
    void shouldPrintErrorMessageWhenNoArgsPassedIn() {
        FingerClient.main(new String[]{});
        verify(outMock).println("Missing required arguments!\n" +
                "Usage: java Application {host name} {zero or more usernames separated by spaces}");
    }

    @Test
    void shouldPrintErrorMessageWhenInvalidHostIsPassedIn() {
        FingerClient.main(new String[]{"1234.arg"});
        verify(outMock).println("Error occurred while trying to connect to 1234.arg\n" +
                "Please check the host name and try again.");
    }

    @Test
    void shouldReturnQueryMessageWhenNoArgsPassedIn() {
        FingerClient.main(new String[]{"directory.purdue.edu"});
        verify(outMock).println(contains("To use finger to search the Purdue Electronic Directory Service, specify your"));
    }

    @Test
    void shouldReturnQueryMessageWhenCorrectUsernamePassedIn() {
        FingerClient.main(new String[]{"directory.purdue.edu", "Smart"});
        verify(outMock).println(startsWith("\nOutput of your query: Smart"));
    }

    @Test
    void shouldReturnQueryMessageWhenMultipleArgsPassedIn() {
        FingerClient.main(new String[]{"directory.purdue.edu", "Smart", "Kaley"});
        verify(outMock).println(and(startsWith("\nOutput of your query: Smart"), contains("Output of your query: Kaley")));
    }
}
