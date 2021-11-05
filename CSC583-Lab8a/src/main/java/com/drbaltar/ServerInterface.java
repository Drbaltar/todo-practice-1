package com.drbaltar;

import java.io.IOException;

public interface ServerInterface {
    String sendMessage(String message) throws IOException;
}
