package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import com.woowacourse.naepyeon.repository.jpa.RollingpaperJpaDao;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class MessageRepositoryTest {

    private static final String content = "안녕하세요";

    private final Team team = new Team("nae-pyeon");
    private final Member member = new Member("member", "email1@email.com", "password123");
    private final Member author = new Member("author", "email2@email.com", "password123");
    private final Rollingpaper rollingpaper = new Rollingpaper("AlexAndKei", team, member);

    @Autowired
    private TeamJpaDao teamJpaDao;
    @Autowired
    private MemberJpaDao memberJpaDao;
    @Autowired
    private RollingpaperJpaDao rollingpaperJpaDao;
    @Autowired
    private MessageRepository messageRepository;

    @BeforeEach
    void setUp() {
        teamJpaDao.save(team);
        memberJpaDao.save(member);
        memberJpaDao.save(author);
        rollingpaperJpaDao.save(rollingpaper);
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
    @DisplayName("메시지 내용을 변경한다.")
    void update() {
        final Message message = createMessage();
        final Long messageId = messageRepository.save(message);
        final String newContent = "알고리즘이 좋아요";

        messageRepository.update(messageId, newContent);
        final Message updateMessage = messageRepository.findById(messageId)
                .orElseThrow();

        assertThat(updateMessage.getContent()).isEqualTo(newContent);
    }

    @Test
    @DisplayName("메시지를 id값을 통해 삭제한다.")
    void delete() {
        final Message message = createMessage();
        final Long messageId = messageRepository.save(message);

        messageRepository.delete(messageId);

        assertThat(messageRepository.findById(messageId))
                .isEmpty();
    }

    private Message createMessage() {
        return new Message(content, author, rollingpaper);
    }
}