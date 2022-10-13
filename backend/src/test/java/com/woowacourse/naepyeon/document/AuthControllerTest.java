package com.woowacourse.naepyeon.document;

import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.woowacourse.naepyeon.controller.dto.TokenRequest;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.service.dto.RefreshTokenDto;
import com.woowacourse.naepyeon.support.oauth.google.GooglePlatformUserProvider;
import com.woowacourse.naepyeon.support.oauth.kakao.KakaoPlatformUserProvider;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

class AuthControllerTest extends TestSupport {

    @MockBean
    private KakaoPlatformUserProvider kakaoPlatformUserProvider;

    @MockBean
    private GooglePlatformUserProvider googlePlatformUserProvider;

    @Test
    void kakaoLogin() throws Exception {
        when(kakaoPlatformUserProvider.getPlatformUser(anyString(), anyString()))
                .thenReturn(new PlatformUserDto("이순신", "email1@email.com", "KAKAO", "1"));
        final TokenRequest tokenRequest = new TokenRequest("seungpang", "https://naepyeon.site/oauth/kakao");

        mockMvc.perform(
                        post("/api/v1/oauth/kakao")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(tokenRequest))
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void googleLogin() throws Exception {
        when(googlePlatformUserProvider.getPlatformUser(anyString(), anyString()))
                .thenReturn(new PlatformUserDto("제로", "email1@email.com", "GOOGLE", "1"));
        final TokenRequest tokenRequest = new TokenRequest("zeroCode", "https://...");

        mockMvc.perform(
                        post("/api/v1/oauth/google")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(tokenRequest))
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void renewalToken() throws Exception {
        final Member member = memberRepository.findById(memberId1).orElseThrow();
        final RefreshToken refreshToken = RefreshToken.createBy(member.getId(), () -> "refreshToken");
        refreshTokenRepository.save(refreshToken);

        final RefreshTokenDto refreshTokenDto = new RefreshTokenDto(refreshToken.getValue());
        mockMvc.perform(
                        post("/api/v1/renewal-token")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(refreshTokenDto))
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void logout() throws Exception {
        final Member member = memberRepository.findById(memberId1).orElseThrow();
        final RefreshToken refreshToken = RefreshToken.createBy(member.getId(), () -> "refreshToken");
        refreshTokenRepository.save(refreshToken);

        final RefreshTokenDto refreshTokenDto = new RefreshTokenDto(refreshToken.getValue());
        mockMvc.perform(
                        post("/api/v1/logout")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(refreshTokenDto))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }
}
