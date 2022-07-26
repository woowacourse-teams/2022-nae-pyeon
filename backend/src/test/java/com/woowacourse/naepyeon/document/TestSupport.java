package com.woowacourse.naepyeon.document;


import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(RestDocumentationExtension.class)
@Import(RestDocsConfiguration.class)
@AutoConfigureTestDatabase
@Sql(scripts = {"classpath:schema.sql", "classpath:testData.sql"})
public abstract class TestSupport {

    protected static String accessToken;
    protected static String teamMemberAccessToken;

    protected MockMvc mockMvc;

    @Autowired
    protected RestDocumentationResultHandler restDocs;

    @Autowired
    protected JwtTokenProvider jwtTokenProvider;

    @Autowired
    protected MemberRepository memberRepository;

    @BeforeEach
    void setUp(
        final WebApplicationContext context,
        final RestDocumentationContextProvider provider
    ) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
            .apply(MockMvcRestDocumentation.documentationConfiguration(provider))
            .alwaysDo(restDocs)
            .build();

        accessToken = jwtTokenProvider.createToken("1");
        teamMemberAccessToken = jwtTokenProvider.createToken("2");
    }

    protected String readJson(final String path) throws IOException {
        return new String(Files.readAllBytes(Paths.get("src/test/resources", path)));
    }
}
