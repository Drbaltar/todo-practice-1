package com.drbaltar;

import java.io.IOException;
import java.util.Arrays;

public class FingerClient {
    public static void main(String[] args) {
        if (args.length > 0)
            sendQueryUsingFingerService(new RequestParams(args));
        else
            printUsageErrorMessage();
    }

    private static void sendQueryUsingFingerService(RequestParams params) {
        try {
            queryHostAndPrintResults(params);
        } catch (IOException e) {
            printConnectionErrorMessage(params.host);
        }
    }

    private static void queryHostAndPrintResults(RequestParams params) throws IOException {
        final var service = new FingerService(params.host);
        System.out.println(service.queryHost(params.userNames));
    }

    private static void printUsageErrorMessage() {
        System.out.println("Missing required arguments!\n" +
                "Usage: java Application {host name} {zero or more usernames separated by spaces}");
    }

    private static void printConnectionErrorMessage(String host) {
        System.out.println("Error occurred while trying to connect to " + host + "\n" +
                "Please check the host name and try again.");
    }

    private static class RequestParams {
        private final String host;
        private final String[] userNames;

        public RequestParams(String[] args) {
            this.host = args[0];
            this.userNames = getUserNames(args);
        }

        private String[] getUserNames(String[] args) {
            return args.length > 1 ? Arrays.copyOfRange(args, 1, args.length) : new String[0];
        }
    }
}
