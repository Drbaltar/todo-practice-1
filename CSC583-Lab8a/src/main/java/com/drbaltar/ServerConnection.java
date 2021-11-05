package com.drbaltar;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.net.SocketAddress;
import java.nio.charset.StandardCharsets;

public class ServerConnection implements ServerInterface {

    private final SocketAddress socketAddress;

    public ServerConnection(String host, int port) throws IOException {
        try (var socket = new Socket(host, port)) {
            socketAddress = socket.getRemoteSocketAddress();
        }
    }

    public String sendMessage(String message) throws IOException {
        try (Socket socket = new Socket()) {
            return transmitMessageAndReceiveResponse(message, socket);
        }
    }

    private String transmitMessageAndReceiveResponse(String message, Socket socket) throws IOException {
        socket.connect(socketAddress);
        transmitMessageToServer(message, socket);
        return readResponseFromServer(socket);
    }

    private void transmitMessageToServer(String message, Socket socket) throws IOException {
        final var out = new OutputStreamWriter(socket.getOutputStream());
        out.write(message);
        out.flush();
    }

    private String readResponseFromServer(Socket socket) throws IOException {
        final var in = socket.getInputStream();
        return new String(in.readAllBytes(), StandardCharsets.US_ASCII);
    }
}
