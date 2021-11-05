package com.drbaltar;

import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.openMocks;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class FingerServiceTest {

    @Test
    void shouldThrowErrorIfHostNameIsNotResolvedDuringConstruction() {
        assertThrows(IOException.class, () -> new FingerService("1234"));
    }

    @Test
    void shouldReturnNewInstanceWithValidHostName() {
        assertDoesNotThrow(() -> new FingerService("directory.purdue.edu"));
    }

    @Nested
    class ForwardingArguments {

        @Mock
        ServerInterface server;
        @InjectMocks
        FingerService service;

        private AutoCloseable closeable;

        @BeforeEach
        void setUp() {
            closeable = openMocks(this);
        }

        @Test
        void shouldOnlyPassThroughASCIICharacters() throws Exception {
            service.queryHost("test\u0370");
            verify(server).sendMessage("test\r\n");
        }

        @Test
        void shouldCorrectlyTransmitNoArgs() throws Exception {
            service.queryHost("");
            verify(server).sendMessage("\r\n");
        }

        @Test
        void shouldCorrectlyTransmitSingleArg() throws Exception {
            service.queryHost("user");
            verify(server).sendMessage("user\r\n");
        }

        @Test
        void shouldCorrectlyTransmitMultipleArgsCorrectly() throws Exception {
            service.queryHost(new String[]{"user1", "user2", "user3"});
            verify(server).sendMessage("user1 user2 user3\r\n");
        }

        @Test
        void shouldReturnServerOutput() throws Exception {
            when(server.sendMessage(anyString())).thenReturn("user1 is logged in");
            assertEquals("user1 is logged in", service.queryHost("user1"));
        }

        @AfterEach
        void tearDown() throws Exception {
            closeable.close();
        }
    }
}
