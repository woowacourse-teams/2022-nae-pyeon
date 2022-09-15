package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.exception.InvalidSecretMessageToTeam;
import com.woowacourse.naepyeon.exception.NotAuthorException;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.exception.NotFoundMessageException;
import com.woowacourse.naepyeon.exception.NotFoundRollingpaperException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.MessageRepository;
import com.woowacourse.naepyeon.repository.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.TeamParticipationRepository;
import com.woowacourse.naepyeon.service.dto.MessageRequestDto;
import com.woowacourse.naepyeon.service.dto.MessageResponseDto;
import com.woowacourse.naepyeon.service.dto.MessageUpdateRequestDto;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import com.woowacourse.naepyeon.service.dto.WrittenMessagesResponseDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public Long saveMessage(final MessageRequestDto messageRequestDto, final Long rollingpaperId, final Long authorId) {
        final Rollingpaper rollingpaper = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow(() -> new NotFoundRollingpaperException(rollingpaperId));
        validateCanSecret(messageRequestDto, rollingpaperId, rollingpaper);
        final Member author = memberRepository.findById(authorId)
                .orElseThrow(() -> new NotFoundMemberException(authorId));
        final Message message = new Message(messageRequestDto.getContent(), messageRequestDto.getColor(),
                author, rollingpaper, messageRequestDto.isAnonymous(), messageRequestDto.isSecret());
        return messageRepository.save(message)
                .getId();
    }

    private void validateCanSecret(
            final MessageRequestDto messageRequestDto, final Long rollingpaperId, final Rollingpaper rollingpaper
    ) {
        if (!rollingpaper.canContainSecretMessage() && messageRequestDto.isSecret()) {
            throw new InvalidSecretMessageToTeam(rollingpaperId);
        }
    }

    @Transactional(readOnly = true)
    public List<MessageResponseDto> findMessages(
            final Long rollingpaperId, final Long teamId, final Long loginMemberId) {
        final Rollingpaper rollingpaper = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow(() -> new NotFoundRollingpaperException(rollingpaperId));
        return messageRepository.findAllByRollingpaperId(rollingpaperId)
                .stream()
                .map(message -> {
                    final Member author = message.getAuthor();
                    final String nickname = findMessageWriterNickname(teamId, message);
                    return MessageResponseDto.of(
                            message,
                            hideContentWhenSecret(message, rollingpaper, message.getContent(), loginMemberId),
                            hideAuthorNicknameWhenAnonymous(message, nickname),
                            author.getId(),
                            checkVisibleToLoginMember(message, rollingpaper, loginMemberId),
                            checkEditableToLoginMember(message, loginMemberId)
                    );
                })
                .collect(Collectors.toUnmodifiableList());
    }

    @Transactional(readOnly = true)
    public WrittenMessagesResponseDto findWrittenMessages(
            final Long loginMemberId, final Integer page, final int count) {
        final Pageable pageRequest = PageRequest.of(page, count);
        final Page<WrittenMessageResponseDto> writtenMessages =
                messageRepository.findAllByAuthorId(loginMemberId, pageRequest);
        return new WrittenMessagesResponseDto(
                writtenMessages.getTotalElements(),
                writtenMessages.getNumber(),
                writtenMessages.getContent()
        );
    }

    private String findMessageWriterNickname(final Long teamId, final Message message) {
        final Member author = message.getAuthor();
        return teamParticipationRepository.findNicknameByMemberIdAndTeamId(author.getId(), teamId);
    }

    @Transactional(readOnly = true)
    public MessageResponseDto findMessage(final Long messageId, final Long rollingpaperId, final Long loginMemberId) {
        final Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new NotFoundMessageException(messageId));
        final Rollingpaper rollingpaper = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow(() -> new NotFoundRollingpaperException(rollingpaperId));
        final Team team = rollingpaper.getTeam();
        final Member author = message.getAuthor();
        final String nickname = findMessageWriterNickname(team.getId(), message);
        final String responseNickname = hideAuthorNicknameWhenAnonymous(message, nickname);
        final String responseContent = hideContentWhenSecret(message, rollingpaper, message.getContent(),
                loginMemberId);
        final boolean visible = checkVisibleToLoginMember(message, rollingpaper, loginMemberId);
        final boolean editable = checkEditableToLoginMember(message, loginMemberId);
        return MessageResponseDto.of(message, responseContent, responseNickname, author.getId(), visible, editable);
    }

    private String hideAuthorNicknameWhenAnonymous(final Message message, final String nickname) {
        if (message.isAnonymous()) {
            return "";
        }
        return nickname;
    }

    private String hideContentWhenSecret(final Message message, final Rollingpaper rollingpaper,
                                         final String content, final Long loginMemberId) {
        if (!message.isSecret()) {
            return content;
        }
        if (message.isAuthor(loginMemberId) || rollingpaper.isAddressee(loginMemberId)) {
            return content;
        }
        return "";
    }

    private boolean checkVisibleToLoginMember(
            final Message message, final Rollingpaper rollingpaper, final Long loginMemberId) {
        if (!message.isSecret()) {
            return true;
        }
        return message.isAuthor(loginMemberId) || rollingpaper.isAddressee(loginMemberId);
    }

    private boolean checkEditableToLoginMember(final Message message, final Long loginMemberId) {
        return message.isAuthor(loginMemberId);
    }

    public void updateMessage(final Long messageId, final MessageUpdateRequestDto messageUpdateRequestDto,
                              final Long memberId) {
        final Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new NotFoundMessageException(messageId));
        validateAuthor(memberId, message);
        message.changeContent(messageUpdateRequestDto.getContent());
        message.changeColor(messageUpdateRequestDto.getColor());
        message.changeAnonymous(messageUpdateRequestDto.isAnonymous());
        message.changeSecret(messageUpdateRequestDto.isSecret());
    }

    public void deleteMessage(final Long messageId, final Long memberId) {
        final Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new NotFoundMessageException(messageId));
        validateAuthor(memberId, message);
        messageRepository.deleteById(messageId);
    }

    private void validateAuthor(final Long memberId, final Message message) {
        if (!message.isAuthor(memberId)) {
            throw new NotAuthorException(memberId);
        }
    }
}
