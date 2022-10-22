package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.config.logging.trace.annotation.NoLogging;
import com.woowacourse.naepyeon.controller.dto.ErrorResponse;
import com.woowacourse.naepyeon.exception.NaePyeonException;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @NoLogging
    public ResponseEntity<ErrorResponse> handleInvalidRequest(
            final BindingResult bindingResult,
            final HttpServletRequest request,
            final MethodArgumentNotValidException e
    ) throws IOException {
        final List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        final FieldError mainError = fieldErrors.get(0);
        final String[] errorInfo = Objects.requireNonNull(mainError.getDefaultMessage()).split(":");

        log.error("UnhandledException: {} {} statusCode={} errMessage={}\n",
                request.getMethod(),
                request.getRequestURI(),
                HttpStatus.BAD_REQUEST.value(),
                errorInfo[1]
        );
        log.debug("Error StackTrace: ", e);

        return ResponseEntity.badRequest().body(new ErrorResponse(errorInfo[0], errorInfo[1]));
    }

    @ExceptionHandler({NaePyeonException.class})
    @NoLogging
    public ResponseEntity<ErrorResponse> handleNaePyeonException(
            final NaePyeonException e,
            final HttpServletRequest request
    ) throws IOException {
        log.error("UnhandledException: {} {} statusCode={} errMessage={}\n",
                request.getMethod(),
                request.getRequestURI(),
                e.getHttpStatus().value(),
                e.getMessage()
        );
        log.debug("Error StackTrace: ", e);

        return ResponseEntity.status(e.getHttpStatus()).body(new ErrorResponse(e.getErrorCode(), e.getShowMessage()));
    }

    @ExceptionHandler({Exception.class})
    @NoLogging
    public ResponseEntity<ErrorResponse> unhandledException(
            final Exception e,
            final HttpServletRequest request
    ) throws IOException {
        log.error("UnhandledException: {} {} errMessage={}\n",
                request.getMethod(),
                request.getRequestURI(),
                e.getMessage()
        );
        log.debug("Error StackTrace: ", e);

        return ResponseEntity.internalServerError()
                .body(new ErrorResponse("99999", "예상하지 못한 예외 발생"));
    }
}
