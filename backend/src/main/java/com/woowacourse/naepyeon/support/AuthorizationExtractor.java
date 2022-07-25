package com.woowacourse.naepyeon.support;

import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;

public class AuthorizationExtractor {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER_TYPE = "Bearer";
    private static final String ACCESS_TOKEN_TYPE = AuthorizationExtractor.class.getSimpleName() + ".ACCESS_TOKEN_TYPE";

    public static String extract(final HttpServletRequest request) {
        final Enumeration<String> headers = request.getHeaders(AUTHORIZATION);
        String authHeaderValue = null;
        while (headers.hasMoreElements()) {
            authHeaderValue = getAuthHeaderValue(request, headers, authHeaderValue);
        }
        return authHeaderValue;
    }

    private static String getAuthHeaderValue(final HttpServletRequest request, final Enumeration<String> headers,
                                             final String authHeaderValue) {
        final String value = headers.nextElement();
        if ((value.toLowerCase().startsWith(BEARER_TYPE.toLowerCase()))) {
            final String headerValue = value.substring(BEARER_TYPE.length()).trim();
            request.setAttribute(ACCESS_TOKEN_TYPE, value.substring(0, BEARER_TYPE.length()).trim());
            return parseAuthHeaderValue(headerValue);
        }
        return authHeaderValue;
    }

    private static String parseAuthHeaderValue(final String authHeaderValue) {
        final int commaIndex = authHeaderValue.indexOf(',');
        if (commaIndex > 0) {
            return authHeaderValue.substring(0, commaIndex);
        }
        return authHeaderValue;
    }
}
