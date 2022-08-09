package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.exception.NotAuthorException;
import com.woowacourse.naepyeon.exception.NotFoundMessageException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.TeamParticipationRepository;
import com.woowacourse.naepyeon.repository.TeamRepository;
import com.woowacourse.naepyeon.service.dto.MessageRequestDto;
import com.woowacourse.naepyeon.service.dto.MessageResponseDto;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import com.woowacourse.naepyeon.service.dto.WrittenMessagesResponseDto;
import java.util.List;
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
    private final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
    private final Member author = new Member("author", "au@hello.com", Platform.KAKAO, "2");
    private final Member otherAuthor = new Member("author2", "aut@hello.com", Platform.KAKAO, "3");
    private final Rollingpaper rollingpaper = new Rollingpaper("AlexAndKei", team, member);
    private final TeamParticipation teamParticipation1 = new TeamParticipation(team, member, "일케이");
    private final TeamParticipation teamParticipation2 = new TeamParticipation(team, author, "이케이");
    private final TeamParticipation teamParticipation3 = new TeamParticipation(team, otherAuthor, "삼케이");

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
        memberRepository.save(otherAuthor);
        rollingpaperRepository.save(rollingpaper);
        teamParticipationRepository.save(teamParticipation1);
        teamParticipationRepository.save(teamParticipation2);
        teamParticipationRepository.save(teamParticipation3);
    }

    @Test
    @DisplayName("메시지를 저장하고 id로 찾는다.")
    void saveMessageAndFind() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId =
                messageService.saveMessage(
                        MessageRequestDto.of(messageRequest.getContent(), messageRequest.getColor()),
                        rollingpaper.getId(), author.getId()
                );

        final MessageResponseDto messageResponse = messageService.findMessage(messageId, rollingpaper.getId());

        assertThat(messageResponse).extracting("content", "from", "authorId")
                .containsExactly(messageRequest.getContent(), "이케이", author.getId());
    }

    @Test
    @DisplayName("내가 작성한 메시지 목록을 조회한다.")
    void findWrittenMessages() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId =
                messageService.saveMessage(MessageRequestDto.of(messageRequest.getContent(), messageRequest.getColor()),
                        rollingpaper.getId(), author.getId()
                );
        messageService.saveMessage(
                MessageRequestDto.of(messageRequest.getContent(), messageRequest.getColor()),
                rollingpaper.getId(), otherAuthor.getId()
        );
        final Long messageId2 = messageService.saveMessage(
                MessageRequestDto.of(messageRequest.getContent(), messageRequest.getColor()),
                rollingpaper.getId(), author.getId()
        );

        final WrittenMessagesResponseDto writtenMessagesResponseDto =
                messageService.findWrittenMessages(author.getId(), 0, 10);
        final List<WrittenMessageResponseDto> actual = writtenMessagesResponseDto.getMessages();
        final List<WrittenMessageResponseDto> expected = List.of(
                new WrittenMessageResponseDto(
                        messageId,
                        rollingpaper.getId(),
                        rollingpaper.getTitle(),
                        team.getId(),
                        team.getName(),
                        "일케이",
                        messageRequest.getContent(),
                        messageRequest.getColor()
                ),
                new WrittenMessageResponseDto(
                        messageId2,
                        rollingpaper.getId(),
                        rollingpaper.getTitle(),
                        team.getId(),
                        team.getName(),
                        "일케이",
                        messageRequest.getContent(),
                        messageRequest.getColor()
                )
        );
        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("메시지 내용과 색상을 수정한다.")
    void updateContent() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId =
                messageService.saveMessage(MessageRequestDto.of(messageRequest.getContent(), messageRequest.getColor()),
                        rollingpaper.getId(), author.getId()
                );
        final String expectedContent = "안녕하지 못합니다.";
        final String expectedColor = "red";

        messageService.updateMessage(messageId, expectedContent, expectedColor, author.getId());

        final MessageResponseDto actual = messageService.findMessage(messageId, rollingpaper.getId());
        final MessageResponseDto expected =
                new MessageResponseDto(messageId, expectedContent, "이케이", author.getId(), expectedColor, false, false);
        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("메시지 작성자가 아닌 멤버가 메시지 내용을 수정할 때 예외 발생")
    void updateContentWithNotAuthor() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                MessageRequestDto.of(messageRequest.getContent(), messageRequest.getColor()),
                rollingpaper.getId(), author.getId()
        );
        final String expected = "안녕하지 못합니다.";

        assertThatThrownBy(() -> messageService.updateMessage(messageId, expected, "green", 9999L))
                .isInstanceOf(NotAuthorException.class);
    }

    @Test
    @DisplayName("메시지를 id로 제거한다.")
    void deleteMessage() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId =
                messageService.saveMessage(
                        MessageRequestDto.of(messageRequest.getContent(), messageRequest.getColor()),
                        rollingpaper.getId(), author.getId()
                );

        messageService.deleteMessage(messageId, author.getId());

        assertThatThrownBy(() -> messageService.findMessage(messageId, rollingpaper.getId()))
                .isInstanceOf(NotFoundMessageException.class);
    }

    @Test
    @DisplayName("메시지 작성자가 아닌 멤버가 메시지를 삭제할 경우 예외발생")
    void deleteMessageWithNotAuthor() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId =
                messageService.saveMessage(
                        MessageRequestDto.of(messageRequest.getContent(), messageRequest.getColor()),
                        rollingpaper.getId(), author.getId()
                );

        assertThatThrownBy(() -> messageService.deleteMessage(messageId, 9999L))
                .isInstanceOf(NotAuthorException.class);
    }

    private MessageRequest createMessageRequest() {
        return new MessageRequest("안녕하세요", "green", false, false);
    }
}
