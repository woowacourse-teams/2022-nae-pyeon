package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import com.woowacourse.naepyeon.repository.jpa.RollingpaperJpaDao;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import com.woowacourse.naepyeon.service.dto.MessageRequest;
import com.woowacourse.naepyeon.service.dto.MessageResponse;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class MessageServiceTest {

    private final Team team = new Team("nae-pyeon");
    private final Member member = new Member("member", "m@hello", "abc@@1234");
    private final Member author = new Member("author", "au@hello", "abc@@1234");
    private final Rollingpaper rollingpaper = new Rollingpaper("AlexAndKei", team, member);

    @Autowired
    private MessageService messageService;

    @Autowired
    private TeamJpaDao teamJpaDao;
    @Autowired
    private MemberJpaDao memberJpaDao;
    @Autowired
    private RollingpaperJpaDao rollingpaperJpaDao;

    @BeforeEach
    void setUp() {
        teamJpaDao.save(team);
        memberJpaDao.save(member);
        memberJpaDao.save(author);
        rollingpaperJpaDao.save(rollingpaper);
    }

    @Test
    @DisplayName("메시지를 저장하고 id로 찾는다.")
    void saveMessageAndFind() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(messageRequest, rollingpaper.getId());

        final MessageResponse messageResponse = messageService.findMessage(messageId);

        assertThat(messageResponse).extracting("content", "from", "authorId")
                .containsExactly(messageRequest.getContent(), author.getUsername(), author.getId());
    }

    @Test
    @DisplayName("메시지의 내용을 수정한다.")
    void updateContent() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(messageRequest, rollingpaper.getId());
        final String expected = "안녕하지 못합니다.";

        messageService.updateContent(messageId, expected);

        final MessageResponse messageResponse = messageService.findMessage(messageId);
        assertThat(messageResponse.getContent()).isEqualTo(expected);
    }

    @Test
    @DisplayName("메시지를 id로 제거한다.")
    void deleteMessage() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(messageRequest, rollingpaper.getId());

        messageService.deleteMessage(messageId);

        assertThatThrownBy(() -> messageService.findMessage(messageId))
                .isInstanceOf(IllegalArgumentException.class);
    }

    private MessageRequest createMessageRequest() {
        return new MessageRequest("안녕하세요", author.getId());
    }
}