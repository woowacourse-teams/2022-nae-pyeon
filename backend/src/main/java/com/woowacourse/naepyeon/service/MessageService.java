package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.TestDataInit;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.MessageRepository;
import com.woowacourse.naepyeon.repository.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import com.woowacourse.naepyeon.service.dto.MessageRequest;
import com.woowacourse.naepyeon.service.dto.MessageResponse;
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
    private final MemberJpaDao memberJpaDao; //todo: #19 머지 후 memberRepository로 변경

    public Long saveMessage(final MessageRequest request, final Long rollingpaperId) {
        final Rollingpaper rollingpaper = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow(IllegalArgumentException::new);
        final Member author = memberJpaDao.findById(request.getAuthorId())
                .orElseThrow(IllegalArgumentException::new);
        final Message message = new Message(request.getContent(), author, rollingpaper);
        return messageRepository.save(message);
    }

    @Transactional(readOnly = true)
    public List<MessageResponse> findMessages(final Long rollingpaperId) {
        return messageRepository.findAllByRollingpaperId(rollingpaperId)
                .stream()
                .map(message ->{
                    final Member author = message.getAuthor();
                    return new MessageResponse(message.getContent(), author.getUsername(), author.getId());
                })
                .collect(Collectors.toUnmodifiableList());
    }

    @Transactional(readOnly = true)
    public MessageResponse findMessage(final Long messageId) {
        final Message message = messageRepository.findById(messageId)
                .orElseThrow(IllegalArgumentException::new);

        final Member author = message.getAuthor();

        return new MessageResponse(message.getContent(), author.getUsername(), author.getId());
    }

    public void updateContent(final Long messageId, final String newContent) {
        messageRepository.update(messageId, newContent);
    }

    public void deleteMessage(final Long messageId) {
        messageRepository.delete(messageId);
    }
}
