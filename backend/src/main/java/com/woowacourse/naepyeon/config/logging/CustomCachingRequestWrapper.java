package com.woowacourse.naepyeon.config.logging;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.util.ContentCachingRequestWrapper;

public class CustomCachingRequestWrapper extends ContentCachingRequestWrapper {

    private boolean used = false;

    public CustomCachingRequestWrapper(final HttpServletRequest request) {
        super(request);
        this.setCharacterEncoding(StandardCharsets.UTF_8.name());
    }

    @Override
    public void setCharacterEncoding(final String enc) {
        try {
            super.setCharacterEncoding(enc);
        } catch (final UnsupportedEncodingException e) {
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        if (used) {
            return new CustomServletInputStream(super.getContentAsByteArray());
        }
        used = true;
        return super.getInputStream();
    }

    static class CustomServletInputStream extends ServletInputStream {

        private final InputStream inputStream;

        public CustomServletInputStream(final byte[] content) {
            this.inputStream = new ByteArrayInputStream(content);
        }

        @Override
        public boolean isFinished() {
            return false;
        }

        @Override
        public boolean isReady() {
            return false;
        }

        @Override
        public void setReadListener(final ReadListener listener) {
        }

        @Override
        public int read() throws IOException {
            return this.inputStream.read();
        }

        @Override
        public int read(final byte[] b) throws IOException {
            return this.inputStream.read(b);
        }
    }
}
