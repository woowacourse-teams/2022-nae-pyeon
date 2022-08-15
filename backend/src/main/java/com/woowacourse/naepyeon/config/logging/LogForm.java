package com.woowacourse.naepyeon.config.logging;

public class LogForm {

    public static final String SUCCESS_REQUEST_FORM = "\n HTTP Method : {} " +
            "\n Request URI : {} " +
            "\n AccessToken Exist : {} " +
            "\n Request Body : {}";

    public static final String FAILED_LOGGING_FORM = "\nOccur Handle Exception!!" +
            "\n HTTP Method : {} " +
            "\n Request URI : {} " +
            "\n AccessToken Exist : {} " +
            "\n Request Body : {}" +
            "\n Http Status Code : {} " +
            "\n Error Message : {}";

    public static final String STACK_TRACE_HEADER = "\nException Stack Trace\n";
}
