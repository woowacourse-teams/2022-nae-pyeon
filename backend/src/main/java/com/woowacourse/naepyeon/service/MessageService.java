package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.exception.NotAuthorException;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.exception.NotFoundMessageException;
import com.woowacourse.naepyeon.exception.NotFoundRollingpaperException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.MessageRepository;
import com.woowacourse.naepyeon.repository.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.TeamParticipationRepository;
import com.woowacourse.naepyeon.service.dto.MessageResponseDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageService {

    private final MessageRepository messageRepository;
    private final RollingpaperRepository rollingpaperRepository;
    private final MemberRepository memberRepository;
    private final TeamParticipationRepository teamParticipationRepository;

    public Long saveMessage(final String content, final Long authorId, final Long rollingpaperId) {
        final Rollingpaper rollingpaper = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow(() -> new NotFoundRollingpaperException(rollingpaperId));
        final Member author = memberRepository.findById(authorId)
                .orElseThrow(() -> new NotFoundMemberException(authorId));
        final Message message = new Message(content, author, rollingpaper);
        return messageRepository.save(message);
    }

    @Transactional(readOnly = true)
    public List<MessageResponseDto> findMessages(final Long rollingpaperId, final Long teamId) {
        return messageRepository.findAllByRollingpaperId(rollingpaperId)
                .stream()
                .map(message -> {
                    final Member author = message.getAuthor();
                    return new MessageResponseDto(
                            message.getId(),
                            message.getContent(),
                            findMessageWriterNickname(teamId, message),
                            author.getId()
                    );
                })
                .collect(Collectors.toUnmodifiableList());
    }

    private String findMessageWriterNickname(final Long teamId, final Message message) {
        final Member author = message.getAuthor();
        return teamParticipationRepository.findNicknameByMemberId(author.getId(), teamId);
    }

    @Transactional(readOnly = true)
    public MessageResponseDto findMessage(final Long messageId, final Long rollingpaperId) {
        final Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new NotFoundMessageException(messageId));
        final Rollingpaper rollingpaper = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow(() -> new NotFoundRollingpaperException(rollingpaperId));
        final Team team = rollingpaper.getTeam();
        final Member author = message.getAuthor();
        final String nickname = findMessageWriterNickname(team.getId(), message);
        return new MessageResponseDto(messageId, message.getContent(), nickname, author.getId());
    }

    public void updateContent(final Long messageId, final String newContent, final Long memberId) {
        final Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new NotFoundMessageException(messageId));
        validateAuthor(memberId, message);
        messageRepository.update(messageId, newContent);
    }

    public void deleteMessage(final Long messageId, final Long memberId) {
        final Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new NotFoundMessageException(messageId));
        validateAuthor(memberId, message);
        messageRepository.delete(messageId);
    }

    private void validateAuthor(final Long memberId, final Message message) {
        if (!message.isAuthor(memberId)) {
            throw new NotAuthorException(memberId);
        }
    }
}
