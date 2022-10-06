package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.config.JpaAuditingConfig;
import com.woowacourse.naepyeon.config.QueryDslConfig;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.repository.message.MessageRepository;
import com.woowacourse.naepyeon.repository.rollingpaper.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.team.TeamRepository;
import com.woowacourse.naepyeon.repository.teamparticipation.TeamParticipationRepository;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@DataJpaTest
@Import({JpaAuditingConfig.class, QueryDslConfig.class})
class MessageRepositoryTest {

    private static final String content = "안녕하세요😁";

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RollingpaperRepository rollingpaperRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private TeamParticipationRepository teamParticipationRepository;

    @Autowired
    private TestEntityManager em;

    private final Team team = new Team(
            "nae-pyeon",
            "테스트 모임입니다.",
            "testEmoji",
            "#123456",
            false
    );
    private final Team team2 = new Team(
            "nae-pyeon2",
            "테스트 모임입니다.",
            "testEmoji",
            "#123456",
            false
    );
    private final Member member = new Member("member", "email1@email.com", Platform.KAKAO, "1");
    private final Member author = new Member("author", "email2@email.com", Platform.KAKAO, "2");
    private final TeamParticipation teamParticipation1 = new TeamParticipation(team, member, "멤버");
    private final TeamParticipation teamParticipation2 = new TeamParticipation(team, author, "작성자");
    private final TeamParticipation teamParticipation3 = new TeamParticipation(team2, member, "멤버");
    private final TeamParticipation teamParticipation4 = new TeamParticipation(team2, author, "작성자");
    private final Rollingpaper rollingpaper =
            new Rollingpaper("AlexAndKei", Recipient.MEMBER, team, member, teamParticipation1);

    @BeforeEach
    void setUp() {
        teamRepository.save(team);
        teamRepository.save(team2);
        memberRepository.save(member);
        memberRepository.save(author);
        teamParticipationRepository.save(teamParticipation1);
        teamParticipationRepository.save(teamParticipation2);
        teamParticipationRepository.save(teamParticipation3);
        teamParticipationRepository.save(teamParticipation4);
        rollingpaperRepository.save(rollingpaper);
    }

    @Test
    @DisplayName("메시지를 저장하고 id값으로 찾는다.")
    void save() {
        final Message message = createMessage();
        final Long messageId = messageRepository.save(message)
                .getId();

        final Message findMessage = messageRepository.findById(messageId)
                .orElseThrow();
        final Rollingpaper findMessageRollingpaper = findMessage.getRollingpaper();
        final Member author = findMessage.getAuthor();

        assertAll(
                () -> assertThat(findMessage)
                        .extracting("id", "content")
                        .containsExactly(messageId, content),
                () -> assertThat(findMessageRollingpaper.getId()).isEqualTo(rollingpaper.getId()),
                () -> assertThat(author.getId()).isEqualTo(author.getId())
        );
    }

    @Test
    @DisplayName("롤링페이퍼 id로 메시지 전체를 찾는다.")
    void findAllByRollingpaperId() {
        final Message message1 = createMessage();
        messageRepository.save(message1);
        final Message message2 = createMessage();
        messageRepository.save(message2);

        final List<Message> findMessages = messageRepository.findAllByRollingpaperId(rollingpaper.getId());

        assertThat(findMessages.size()).isEqualTo(2);
    }

    @Test
    @DisplayName("본인이 작성한 메시지들을 찾는다.")
    void findAllByMemberIdAndPageRequest() {
        final Rollingpaper rollingpaper2 =
                new Rollingpaper("AlexAndKei2", Recipient.TEAM, team, member);
        rollingpaperRepository.save(rollingpaper2);

        final List<Message> messages = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            final Message message = new Message(content, "green", author, rollingpaper, false, false);
            messages.add(message);
            messageRepository.save(message);
        }
        final List<WrittenMessageResponseDto> expected = List.of(
                WrittenMessageResponseDto.of(rollingpaper, team, "멤버", messages.get(5)),
                WrittenMessageResponseDto.of(rollingpaper, team, "멤버", messages.get(6)),
                WrittenMessageResponseDto.of(rollingpaper, team, "멤버", messages.get(7)),
                WrittenMessageResponseDto.of(rollingpaper, team, "멤버", messages.get(8)),
                WrittenMessageResponseDto.of(rollingpaper, team, "멤버", messages.get(9))
        );

        final Page<WrittenMessageResponseDto> writtenMessageResponseDtos =
                messageRepository.findAllByAuthorId(author.getId(), PageRequest.of(1, 5));
        final List<WrittenMessageResponseDto> actual = writtenMessageResponseDtos.getContent();
        assertAll(
                () -> assertThat(writtenMessageResponseDtos.getTotalElements()).isEqualTo(12),
                () -> assertThat(actual)
                        .usingRecursiveComparison()
                        .isEqualTo(expected)
        );
    }

    @Test
    @DisplayName("메시지를 id값을 통해 삭제한다.")
    void delete() {
        final Member member = memberRepository.findById(author.getId())
                .orElseThrow();
        final Message message = new Message(content, "green", member, rollingpaper, false, false);
        final Long messageId = messageRepository.save(message)
                .getId();

        messageRepository.deleteById(messageId);

        assertThat(messageRepository.findById(messageId))
                .isEmpty();
    }

    @Test
    @DisplayName("메시지를 생성할 때 생성일자가 올바르게 나온다.")
    void createMemberWhen() {
        final Message message = createMessage();
        final Long messageId = messageRepository.save(message)
                .getId();

        final Message actual = messageRepository.findById(messageId)
                .orElseThrow();
        assertThat(actual.getCreatedDate()).isAfter(LocalDateTime.MIN);
    }

    @Test
    @DisplayName("메시지를 수정할 때 수정일자가 올바르게 나온다.")
    void updateMemberWhen() {
        final Message message = createMessage();
        final Long messageId = messageRepository.save(message)
                .getId();

        message.changeContent("updateupdate");
        em.flush();

        final Message actual = messageRepository.findById(messageId)
                .orElseThrow();
        assertThat(actual.getLastModifiedDate()).isAfter(actual.getCreatedDate());
    }

    private Message createMessage() {
        return new Message(content, "green", author, rollingpaper, false, false);
    }
}
