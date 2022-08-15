package com.woowacourse.naepyeon.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.woowacourse.naepyeon.config.logging.LogForm;
import com.woowacourse.naepyeon.controller.dto.ErrorResponse;
import com.woowacourse.naepyeon.exception.NaePyeonException;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.util.ContentCachingRequestWrapper;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class ControllerAdvice {

    private final ObjectMapper objectMapper;

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ErrorResponse> handleInvalidRequest(
            final BindingResult bindingResult,
            final HttpServletRequest request
    ) throws IOException {
        final List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        final FieldError mainError = fieldErrors.get(0);
        final String[] errorInfo = Objects.requireNonNull(mainError.getDefaultMessage()).split(":");

        final ContentCachingRequestWrapper cachingRequest = (ContentCachingRequestWrapper) request;
        log.info(
                LogForm.FAILED_LOGGING_FORM,
                request.getMethod(),
                request.getRequestURI(),
                StringUtils.hasText(request.getHeader(HttpHeaders.AUTHORIZATION)),
                objectMapper.readTree(cachingRequest.getContentAsByteArray()),
                HttpStatus.BAD_REQUEST.value(),
                errorInfo[1]
        );

        return ResponseEntity.badRequest().body(new ErrorResponse(errorInfo[0], errorInfo[1]));
    }

    @ExceptionHandler({NaePyeonException.class})
    public ResponseEntity<ErrorResponse> handleNaePyeonException(
            final NaePyeonException e,
            final HttpServletRequest request
    ) throws IOException {
        final ContentCachingRequestWrapper cachingRequest = (ContentCachingRequestWrapper) request;
        log.info(
                LogForm.FAILED_LOGGING_FORM,
                request.getMethod(),
                request.getRequestURI(),
                StringUtils.hasText(request.getHeader(HttpHeaders.AUTHORIZATION)),
                objectMapper.readTree(cachingRequest.getContentAsByteArray()),
                e.getHttpStatus().value(),
                e.getMessage()
        );
        log.debug(LogForm.STACK_TRACE_HEADER, e);

        return ResponseEntity.status(e.getHttpStatus()).body(new ErrorResponse(e.getErrorCode(), e.getShowMessage()));
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ErrorResponse> unhandledException(
            final Exception e,
            final HttpServletRequest request
    ) throws IOException {
        final ContentCachingRequestWrapper cachingRequest = (ContentCachingRequestWrapper) request;
        log.error(
                LogForm.FAILED_LOGGING_FORM,
                request.getMethod(),
                request.getRequestURI(),
                StringUtils.hasText(request.getHeader(HttpHeaders.AUTHORIZATION)),
                objectMapper.readTree(cachingRequest.getContentAsByteArray()),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                e.getMessage()
        );
        log.debug(LogForm.STACK_TRACE_HEADER, e);

        return ResponseEntity.internalServerError()
                .body(new ErrorResponse("99999", "예상하지 못한 예외 발생"));
    }
}
