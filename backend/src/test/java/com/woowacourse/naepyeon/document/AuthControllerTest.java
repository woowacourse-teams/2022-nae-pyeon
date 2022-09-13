package com.woowacourse.naepyeon.document;

import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.woowacourse.naepyeon.controller.dto.NaverTokenRequest;
import com.woowacourse.naepyeon.controller.dto.TokenRequest;
import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.support.oauth.kakao.KakaoPlatformUserProvider;
import com.woowacourse.naepyeon.support.oauth.naver.NaverPlatformUserProvider;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

class AuthControllerTest extends TestSupport {

    @MockBean
    private KakaoPlatformUserProvider kakaoPlatformUserProvider;

    @MockBean
    private NaverPlatformUserProvider naverPlatformUserProvider;

    @Test
    void kakaoLogin() throws Exception {
        when(kakaoPlatformUserProvider.getPlatformUser(anyString(), anyString()))
                .thenReturn(new PlatformUserDto("이순신", "email1@email.com", "KAKAO", "1"));
        final TokenRequest tokenRequest = new TokenRequest("seungpang", "https://...");

        mockMvc.perform(
                        post("/api/v1/oauth/kakao")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(tokenRequest))
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void naverLogin() throws Exception {
        when(naverPlatformUserProvider.getPlatformUser(anyString(), anyString(), anyString()))
                .thenReturn(new PlatformUserDto("김승래", "email1@email.com", "NAVER", "2"));
        final NaverTokenRequest naverTokenRequest = new NaverTokenRequest("seungpang", "https://...", "naepyeon");

        mockMvc.perform(
                        post("/api/v1/oauth/naver")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(naverTokenRequest))
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }
}
