package com.woowacourse.naepyeon.config.logging.trace.aspect;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.config.logging.trace.LoggingTracer;
import com.woowacourse.naepyeon.controller.MemberController;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.service.MemberService;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.aop.support.AopUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LogTraceAspectTest {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    MemberController memberController;

    @Autowired
    LoggingTracer loggingTracer;

    @Test
    @DisplayName("com.woowacourse.naepyeon의 빈들에 로깅 프록시를 적용한다.")
    void doLoggingProxy() {
        assertAll(
                () -> assertThat(AopUtils.isAopProxy(memberService)).isTrue(),
                () -> assertThat(AopUtils.isAopProxy(memberRepository)).isTrue(),
                () -> assertThat(AopUtils.isAopProxy(jwtTokenProvider)).isTrue(),
                () -> assertThat(AopUtils.isAopProxy(memberController)).isTrue()
        );
    }

    @Test
    @DisplayName("LoggingTracer는 aop 적용 대상에서 제외한다. (안하면 스택오버플로우 남)")
    void noAopLoggingTracer() {
        assertThat(AopUtils.isAopProxy(loggingTracer)).isFalse();
    }
}
