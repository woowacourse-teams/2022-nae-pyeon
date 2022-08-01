package com.woowacourse.naepyeon.repository;

import static java.lang.Thread.sleep;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class MessageRepositoryTest {

    private static final String content = "안녕하세요";

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
    private EntityManager em;

    private final Team team = new Team(
            "nae-pyeon",
            "테스트 모임입니다.",
            "testEmoji",
            "#123456"
    );
    private final Member member = new Member("member", "email1@email.com", "password123");
    private final Member author = new Member("author", "email2@email.com", "password123");
    private final Rollingpaper rollingpaper = new Rollingpaper("AlexAndKei", team, member);

    @BeforeEach
    void setUp() {
        teamRepository.save(team);
        memberRepository.save(member);
        memberRepository.save(author);
        rollingpaperRepository.save(rollingpaper);
    }

    @Test
    @DisplayName("메시지를 저장하고 id값으로 찾는다.")
    void save() {
        final Message message = createMessage();
        final Long messageId = messageRepository.save(message);

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
        final TeamParticipation teamParticipation1 = new TeamParticipation(team, member, "멤버");
        teamParticipationRepository.save(teamParticipation1);
        final TeamParticipation teamParticipation2 = new TeamParticipation(team, author, "작성자");
        teamParticipationRepository.save(teamParticipation2);

        final Message message1 = createMessage();
        messageRepository.save(message1);
        final Message message2 = createMessage();
        messageRepository.save(message2);
        final Message message3 = createMessage();
        messageRepository.save(message3);
        final Message message4 = createMessage();
        messageRepository.save(message4);
        final Message message5 = createMessage();
        messageRepository.save(message5);

        final Page<WrittenMessageResponseDto> writtenMessageResponseDtos =
                messageRepository.findAllByAuthorId(author.getId(), PageRequest.of(1, 2));
        final List<WrittenMessageResponseDto> actual = writtenMessageResponseDtos.getContent();

        assertThat(actual).hasSize(2);
    }

    @Test
    @DisplayName("본인이 작성한 메시지 내용과 색상을 변경한다.")
    void update() {
        final Member member = memberRepository.findByEmail(author.getEmail())
                .orElseThrow();
        final Message message = new Message(content, "green", member, rollingpaper);
        final Long messageId = messageRepository.save(message);
        final String newContent = "알고리즘이 좋아요";
        final String newColor = "red";

        messageRepository.update(messageId, newColor, newContent);
        final Message updateMessage = messageRepository.findById(messageId)
                .orElseThrow();

        assertThat(updateMessage.getContent()).isEqualTo(newContent);
    }

    @Test
    @DisplayName("메시지를 id값을 통해 삭제한다.")
    void delete() {
        final Member member = memberRepository.findByEmail(author.getEmail())
                .orElseThrow();
        final Message message = new Message(content, "green", member, rollingpaper);
        final Long messageId = messageRepository.save(message);

        messageRepository.delete(messageId);

        assertThat(messageRepository.findById(messageId))
                .isEmpty();
    }

    @Test
    @DisplayName("메시지를 생성할 때 생성일자가 올바르게 나온다.")
    void createMemberWhen() {
        final Message message = createMessage();
        final Long messageId = messageRepository.save(message);

        final Message actual = messageRepository.findById(messageId)
                .orElseThrow();
        assertThat(actual.getCreatedDate()).isAfter(LocalDateTime.MIN);
    }

    @Test
    @DisplayName("메시지를 수정할 때 수정일자가 올바르게 나온다.")
    void updateMemberWhen() throws InterruptedException {
        final Message message = createMessage();
        final Long messageId = messageRepository.save(message);

        sleep(1);
        message.changeContent("updateupdate");
        em.flush();

        final Message actual = messageRepository.findById(messageId)
                .orElseThrow();
        assertThat(actual.getLastModifiedDate()).isAfter(actual.getCreatedDate());
    }

    private Message createMessage() {
        return new Message(content, "green", author, rollingpaper);
    }
}
