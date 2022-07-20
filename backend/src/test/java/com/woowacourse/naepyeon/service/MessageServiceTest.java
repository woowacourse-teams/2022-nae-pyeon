package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.exception.NotAuthorException;
import com.woowacourse.naepyeon.exception.NotFoundMessageException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.TeamParticipationRepository;
import com.woowacourse.naepyeon.repository.TeamRepository;
import com.woowacourse.naepyeon.service.dto.MessageResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class MessageServiceTest {

    private final Team team = new Team(
            "nae-pyeon",
            "테스트 모임입니다.",
            "testEmoji",
            "#123456");
    private final Member member = new Member("member", "m@hello.com", "abc@@1234");
    private final Member author = new Member("author", "au@hello.com", "abc@@1234");
    private final Rollingpaper rollingpaper = new Rollingpaper("AlexAndKei", team, member);
    private final TeamParticipation teamParticipation = new TeamParticipation(team, author, "테스트닉네임");

    @Autowired
    private MessageService messageService;

    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private RollingpaperRepository rollingpaperRepository;
    @Autowired
    private TeamParticipationRepository teamParticipationRepository;

    @BeforeEach
    void setUp() {
        teamRepository.save(team);
        memberRepository.save(member);
        memberRepository.save(author);
        rollingpaperRepository.save(rollingpaper);
        teamParticipationRepository.save(teamParticipation);
    }

    @Test
    @DisplayName("메시지를 저장하고 id로 찾는다.")
    void saveMessageAndFind() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                messageRequest.getContent(),
                author.getId(),
                rollingpaper.getId()
        );

        final Team team = rollingpaper.getTeam();
        final MessageResponseDto messageResponse = messageService.findMessage(messageId, team.getId());

        assertThat(messageResponse).extracting("content", "from", "authorId")
                .containsExactly(messageRequest.getContent(), "테스트닉네임", author.getId());
    }

    @Test
    @DisplayName("메시지의 내용을 수정한다.")
    void updateContent() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                messageRequest.getContent(),
                author.getId(),
                rollingpaper.getId()
        );
        final String expected = "안녕하지 못합니다.";

        messageService.updateContent(messageId, expected, author.getId());

        final MessageResponseDto messageResponse = messageService.findMessage(messageId, rollingpaper.getId());
        assertThat(messageResponse.getContent()).isEqualTo(expected);
    }

    @Test
    @DisplayName("메시지 작성자가 아닌 멤버가 메시지 내용을 수정할 때 예외 발생")
    void updateContentWithNotAuthor() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                messageRequest.getContent(),
                author.getId(),
                rollingpaper.getId()
        );
        final String expected = "안녕하지 못합니다.";

        assertThatThrownBy(() -> messageService.updateContent(messageId, expected, 9999L))
                .isInstanceOf(NotAuthorException.class);
    }

    @Test
    @DisplayName("메시지를 id로 제거한다.")
    void deleteMessage() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                messageRequest.getContent(),
                author.getId(),
                rollingpaper.getId()
        );

        messageService.deleteMessage(messageId, author.getId());

        assertThatThrownBy(() -> messageService.findMessage(messageId, rollingpaper.getId()))
                .isInstanceOf(NotFoundMessageException.class);
    }

    @Test
    @DisplayName("메시지 작성자가 아닌 멤버가 메시지를 삭제할 경우 예외발생")
    void deleteMessageWithNotAuthor() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                messageRequest.getContent(),
                author.getId(),
                rollingpaper.getId()
        );

        assertThatThrownBy(() -> messageService.deleteMessage(messageId, 9999L))
                .isInstanceOf(NotAuthorException.class);
    }

    private MessageRequest createMessageRequest() {
        return new MessageRequest("안녕하세요");
    }
}
