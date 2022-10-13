package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.exception.InvalidCancelLikeMessageException;
import com.woowacourse.naepyeon.exception.InvalidLikeMessageException;
import com.woowacourse.naepyeon.exception.InvalidSecretMessageToTeam;
import com.woowacourse.naepyeon.exception.NotAuthorException;
import com.woowacourse.naepyeon.exception.NotFoundMessageException;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.repository.messagelike.MessageLikeRepository;
import com.woowacourse.naepyeon.repository.rollingpaper.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.team.TeamRepository;
import com.woowacourse.naepyeon.repository.teamparticipation.TeamParticipationRepository;
import com.woowacourse.naepyeon.service.dto.MessageLikeResponseDto;
import com.woowacourse.naepyeon.service.dto.MessageRequestDto;
import com.woowacourse.naepyeon.service.dto.MessageResponseDto;
import com.woowacourse.naepyeon.service.dto.MessageUpdateRequestDto;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import com.woowacourse.naepyeon.service.dto.WrittenMessagesResponseDto;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class MessageServiceTest {

    private static final String TEAM_NAME = "nae-pyeon";
    private final Team team = new Team(
            TEAM_NAME,
            "테스트 모임입니다.",
            "testEmoji",
            "#123456",
            false);
    private final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
    private final Member author = new Member("author", "au@hello.com", Platform.KAKAO, "2");
    private final Member otherAuthor = new Member("author2", "aut@hello.com", Platform.KAKAO, "3");
    private final TeamParticipation teamParticipation1 = new TeamParticipation(team, member, "일케이");
    private final TeamParticipation teamParticipation2 = new TeamParticipation(team, author, "이케이");
    private final TeamParticipation teamParticipation3 = new TeamParticipation(team, otherAuthor, "삼케이");
    private final Rollingpaper teamRollingpaper =
            new Rollingpaper("AlexAndKei", Recipient.TEAM, team, null, null);
    private final Rollingpaper memberRollingpaper =
            new Rollingpaper("AlexAndKei", Recipient.MEMBER, team, member, teamParticipation1);

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

    @Autowired
    private MessageLikeRepository messageLikeRepository;

    @BeforeEach
    void setUp() {
        teamRepository.save(team);
        memberRepository.save(member);
        memberRepository.save(author);
        memberRepository.save(otherAuthor);
        teamParticipationRepository.save(teamParticipation1);
        teamParticipationRepository.save(teamParticipation2);
        teamParticipationRepository.save(teamParticipation3);
        rollingpaperRepository.save(memberRollingpaper);
        rollingpaperRepository.save(teamRollingpaper);
    }

    @Test
    @DisplayName("메시지를 저장하고 id로 찾는다.")
    void saveMessageAndFind() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), author.getId()
        );
        final MessageResponseDto messageResponse =
                messageService.findMessage(messageId, memberRollingpaper.getId(), author.getId());

        assertThat(messageResponse).extracting("content", "from", "authorId")
                .containsExactly(messageRequest.getContent(), "이케이", author.getId());
    }

    @Test
    @DisplayName("모임에게 비밀 메시지로 작성할 경우 예외를 발생시킨다.")
    void saveMessageWithSecretToTeam() {
        final MessageRequest messageRequest = createMessageRequest();

        assertThatThrownBy(() -> messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, true),
                teamRollingpaper.getId(), author.getId()
        )).isInstanceOf(InvalidSecretMessageToTeam.class);
    }

    @Test
    @DisplayName("익명 메시지일 경우, 조회자가 누구든지 상관없이 닉네임은 빈 문자열로 넘겨준다.")
    void findAnonymousMessage() {
        final Long messageId =
                messageService.saveMessage(
                        new MessageRequestDto("안녕하세요", "green", true, false),
                        memberRollingpaper.getId(), author.getId()
                );
        final MessageResponseDto messageResponse =
                messageService.findMessage(messageId, memberRollingpaper.getId(), author.getId());

        assertThat(messageResponse.getFrom()).isEmpty();
    }

    @Test
    @DisplayName("비밀 메시지인 경우, 작성자는 내용을 확인할 수 있다.")
    void findSecretMessageWithAuthor() {
        final Long messageId =
                messageService.saveMessage(
                        new MessageRequestDto("안녕하세요", "green", false, true),
                        memberRollingpaper.getId(), author.getId()
                );
        final MessageResponseDto messageResponse =
                messageService.findMessage(messageId, memberRollingpaper.getId(), author.getId());

        assertThat(messageResponse.getContent()).isEqualTo("안녕하세요");
    }

    @Test
    @DisplayName("비밀 메시지인 경우, 롤링페이퍼 수신인은 내용을 확인할 수 있다.")
    void findSecretMessageWithAddressee() {
        final Long messageId =
                messageService.saveMessage(
                        new MessageRequestDto("안녕하세요", "green", false, true),
                        memberRollingpaper.getId(), author.getId()
                );
        final MessageResponseDto messageResponse =
                messageService.findMessage(messageId, memberRollingpaper.getId(), member.getId());

        assertThat(messageResponse.getContent()).isEqualTo("안녕하세요");
    }

    @Test
    @DisplayName("비밀 메시지인 경우, 작성자와 롤링페이퍼 수신인 외의 회원은 내용을 빈 문자열로 넘겨준다.")
    void findSecretMessage() {
        final Long messageId =
                messageService.saveMessage(
                        new MessageRequestDto("안녕하세요", "green", false, true),
                        memberRollingpaper.getId(), author.getId()
                );
        final MessageResponseDto messageResponse =
                messageService.findMessage(messageId, memberRollingpaper.getId(), otherAuthor.getId());

        assertThat(messageResponse.getContent()).isEmpty();
    }

    @Test
    @DisplayName("비밀글이 아닌 경우 visible은 항상 true이다.")
    void isVisibleWithNotSecret() {
        final Long messageId =
                messageService.saveMessage(
                        new MessageRequestDto("안녕하세요", "green", true, false),
                        memberRollingpaper.getId(), author.getId()
                );
        final MessageResponseDto messageResponse =
                messageService.findMessage(messageId, memberRollingpaper.getId(), otherAuthor.getId());

        assertThat(messageResponse.isVisible()).isTrue();
    }

    @Test
    @DisplayName("비밀글인 경우, 작성자와 수신인 외의 경우에 visible은 false이다.")
    void isVisibleWithSecret() {
        final Long messageId =
                messageService.saveMessage(
                        new MessageRequestDto("안녕하세요", "green", true, true),
                        memberRollingpaper.getId(), author.getId()
                );
        final MessageResponseDto messageResponse1 =
                messageService.findMessage(messageId, memberRollingpaper.getId(), member.getId());
        final MessageResponseDto messageResponse2 =
                messageService.findMessage(messageId, memberRollingpaper.getId(), author.getId());
        final MessageResponseDto messageResponse3 =
                messageService.findMessage(messageId, memberRollingpaper.getId(), otherAuthor.getId());

        assertAll(
                () -> assertThat(messageResponse1.isVisible()).isTrue(),
                () -> assertThat(messageResponse2.isVisible()).isTrue(),
                () -> assertThat(messageResponse3.isVisible()).isFalse()
        );
    }

    @Test
    @DisplayName("작성자와 수신인 외의 경우에 editable은 false이다.")
    void isEditable() {
        final Long messageId =
                messageService.saveMessage(
                        new MessageRequestDto("안녕하세요", "green", true, false),
                        memberRollingpaper.getId(), author.getId()
                );
        final MessageResponseDto messageResponse1 =
                messageService.findMessage(messageId, memberRollingpaper.getId(), member.getId());
        final MessageResponseDto messageResponse2 =
                messageService.findMessage(messageId, memberRollingpaper.getId(), author.getId());
        final MessageResponseDto messageResponse3 =
                messageService.findMessage(messageId, memberRollingpaper.getId(), otherAuthor.getId());

        assertAll(
                () -> assertThat(messageResponse1.isEditable()).isFalse(),
                () -> assertThat(messageResponse2.isEditable()).isTrue(),
                () -> assertThat(messageResponse3.isEditable()).isFalse()
        );
    }

    @Test
    @DisplayName("내가 작성한 메시지 목록을 조회한다.")
    void findWrittenMessages() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), author.getId()
        );
        final Long messageId2 = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                teamRollingpaper.getId(), author.getId()
        );

        final WrittenMessagesResponseDto writtenMessagesResponseDto =
                messageService.findWrittenMessages(author.getId(), 0, 10);
        final List<WrittenMessageResponseDto> actual = writtenMessagesResponseDto.getMessages();
        final List<WrittenMessageResponseDto> expected = List.of(
                new WrittenMessageResponseDto(
                        messageId2,
                        teamRollingpaper.getId(),
                        teamRollingpaper.getTitle(),
                        team.getId(),
                        team.getName(),
                        messageRequest.getContent(),
                        messageRequest.getColor(),
                        TEAM_NAME
                ),
                new WrittenMessageResponseDto(
                        messageId,
                        memberRollingpaper.getId(),
                        memberRollingpaper.getTitle(),
                        team.getId(),
                        team.getName(),
                        messageRequest.getContent(),
                        messageRequest.getColor(),
                        "일케이"
                )
        );
        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("메시지 내용과 색상을 수정한다.")
    void updateMessageContentAndColor() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), author.getId()
        );
        final String expectedContent = "안녕하지 못합니다.";
        final String expectedColor = "red";
        final MessageUpdateRequestDto messageUpdateRequestDto =
                new MessageUpdateRequestDto(
                        expectedContent,
                        expectedColor,
                        false,
                        false
                );

        messageService.updateMessage(messageId, messageUpdateRequestDto, author.getId());

        final MessageResponseDto actual = messageService.findMessage(messageId, memberRollingpaper.getId(),
                author.getId());
        final MessageResponseDto expected =
                new MessageResponseDto(messageId, expectedContent, "이케이", author.getId(),
                        expectedColor, false, false, true, true, 0L, false);
        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("메시지 익명 옵션을 수정한다.")
    void updateMessageAnonymous() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), author.getId()
        );
        final boolean expectedAnonymous = true;
        final MessageUpdateRequestDto messageUpdateRequestDto =
                new MessageUpdateRequestDto(
                        messageRequest.getContent(),
                        messageRequest.getColor(),
                        expectedAnonymous,
                        false
                );

        messageService.updateMessage(messageId, messageUpdateRequestDto, author.getId());

        final MessageResponseDto actual = messageService.findMessage(messageId, memberRollingpaper.getId(),
                author.getId());
        final MessageResponseDto expected =
                new MessageResponseDto(messageId, messageRequest.getContent(), "", author.getId(),
                        messageRequest.getColor(), expectedAnonymous, false, true, true, 0L, false);
        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("메시지 비밀글 옵션을 수정한다.")
    void updateMessageSecret() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), author.getId()
        );
        final boolean expectedSecret = true;
        final MessageUpdateRequestDto messageUpdateRequestDto =
                new MessageUpdateRequestDto(
                        messageRequest.getContent(),
                        messageRequest.getColor(),
                        false,
                        expectedSecret
                );

        messageService.updateMessage(messageId, messageUpdateRequestDto, author.getId());

        final MessageResponseDto actual = messageService.findMessage(messageId, memberRollingpaper.getId(),
                author.getId());
        final MessageResponseDto expected =
                new MessageResponseDto(messageId, messageRequest.getContent(), "이케이", author.getId(),
                        messageRequest.getColor(), false, expectedSecret, true, true, 0L, false);
        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("메시지 작성자가 아닌 멤버가 메시지 내용을 수정할 때 예외 발생")
    void updateContentWithNotAuthor() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), author.getId()
        );
        final String expected = "안녕하지 못합니다.";
        final MessageUpdateRequestDto messageUpdateRequestDto =
                new MessageUpdateRequestDto(
                        expected,
                        messageRequest.getColor(),
                        false,
                        false
                );

        assertThatThrownBy(() -> messageService.updateMessage(messageId, messageUpdateRequestDto, 9999L))
                .isInstanceOf(NotAuthorException.class);
    }

    @Test
    @DisplayName("메시지를 id로 제거한다.")
    void deleteMessage() {
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), author.getId()
        );

        messageService.deleteMessage(messageId, author.getId());

        assertThatThrownBy(() -> messageService.findMessage(messageId, memberRollingpaper.getId(), author.getId()))
                .isInstanceOf(NotFoundMessageException.class);
    }

    @Test
    @DisplayName("메시지 작성자가 아닌 멤버가 메시지를 삭제할 경우 예외발생")
    void deleteMessageWithNotAuthor() {
        final MessageRequest messageRequest = createMessageRequest();

        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), author.getId()
        );

        assertThatThrownBy(() -> messageService.deleteMessage(messageId, 9999L))
                .isInstanceOf(NotAuthorException.class);
    }

    @Test
    @DisplayName("메시지에 좋아요를 누를 수 있다")
    void likeMessage() {
        // given
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), member.getId()
        );

        // when
        MessageLikeResponseDto messageLikeResponseDto = messageService.likeMessage(member.getId(),
                memberRollingpaper.getId(), messageId);

        // then
        assertThat(messageLikeResponseDto)
                .extracting("likes", "liked")
                .containsExactly(1L, true);
    }

    @Test
    @DisplayName("한 사람이 같은 메시지에 좋아요를 여러번 할 수 없다.")
    void likeMessage_again() {
        // given
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), member.getId()
        );

        // when
        messageService.likeMessage(member.getId(), memberRollingpaper.getId(), messageId);

        // then
        assertThatThrownBy(() -> messageService.likeMessage(member.getId(), memberRollingpaper.getId(), messageId))
                .isInstanceOf(InvalidLikeMessageException.class);
    }

    @Test
    @DisplayName("여러명이 같은 메시지에 좋아요를 누를 수 있다.")
    void likeMessage_together() {
        // given
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), member.getId()
        );

        // when
        messageService.likeMessage(member.getId(), memberRollingpaper.getId(), messageId);
        messageService.likeMessage(author.getId(), memberRollingpaper.getId(), messageId);
        MessageLikeResponseDto messageLikeResponseDto = messageService.likeMessage(otherAuthor.getId(),
                memberRollingpaper.getId(), messageId);

        // then
        assertThat(messageLikeResponseDto)
                .extracting("likes", "liked")
                .containsExactly(3L, true);
    }

    @Test
    @DisplayName("좋아요를 누르지 않아도 다른사람이 누른 좋아요 개수를 확인할 수 있다.")
    void likeMessage_likes() {
        // given
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), member.getId()
        );

        // when
        messageService.likeMessage(member.getId(), memberRollingpaper.getId(), messageId);
        messageService.likeMessage(author.getId(), memberRollingpaper.getId(), messageId);
        MessageResponseDto message = messageService.findMessage(messageId, memberRollingpaper.getId(),
                otherAuthor.getId());

        // then
        assertThat(message)
                .extracting("likes", "liked")
                .containsExactly(2L, false);
    }

    @Test
    @DisplayName("메시지에 좋아요 취소를 할 수 있다")
    void cancelLikeMessage() {
        // given
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), member.getId()
        );

        // when
        messageService.likeMessage(member.getId(), memberRollingpaper.getId(), messageId);
        MessageLikeResponseDto messageLikeResponseDto = messageService.cancelLikeMessage(member.getId(), messageId);

        // then
        assertThat(messageLikeResponseDto)
                .extracting("likes", "liked")
                .containsExactly(0L, false);
    }

    @Test
    @DisplayName("메시지 좋아요를 하지 않은 상태에서 좋아요 취소를 할 수 없다.")
    void invalidCancelLikeMessage() {
        // given
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), member.getId()
        );

        // when & then
        assertThatThrownBy(() -> messageService.cancelLikeMessage(member.getId(), messageId))
                .isInstanceOf(InvalidCancelLikeMessageException.class);
    }

    @Test
    @DisplayName("메시지 좋아요를 후 메세지를 삭제하면 메시지 좋아요 기록도 삭제된다.")
    void LikeMessageAfterDeleteMessage() {
        // given
        final MessageRequest messageRequest = createMessageRequest();
        final Long messageId = messageService.saveMessage(
                new MessageRequestDto(messageRequest.getContent(), messageRequest.getColor(), false, false),
                memberRollingpaper.getId(), member.getId()
        );

        // when
        messageService.likeMessage(member.getId(), memberRollingpaper.getId(), messageId);
        messageService.deleteMessage(messageId, member.getId());

        // then
        assertThat(messageLikeRepository.findByMemberIdAndMessageId(member.getId(), messageId))
                .isEmpty();
    }

    private MessageRequest createMessageRequest() {
        return new MessageRequest("안녕하세요", "green", false, false);
    }
}
