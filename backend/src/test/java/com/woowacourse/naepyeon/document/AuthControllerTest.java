package com.woowacourse.naepyeon.document;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AuthControllerTest extends TestSupport {

    @Test
    void login() throws Exception {
        mockMvc.perform(
                        post("/api/v1/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/auth/login.json"))
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }
}
