package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.controller.dto.MessageUpdateContentRequest;
import com.woowacourse.naepyeon.service.MessageService;
import com.woowacourse.naepyeon.service.dto.MessageResponseDto;
import java.net.URI;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/rollingpapers/{rollingpaperId}/messages")
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<Void> createMessage(@RequestBody @Valid final MessageRequest messageRequest,
                                              @PathVariable final Long rollingpaperId) {
        final Long messageId = messageService.saveMessage(messageRequest.getContent(), messageRequest.getAuthorId(),
                rollingpaperId);
        return ResponseEntity.created(
                URI.create("/api/v1/rollingpapers/" + rollingpaperId + "/messages/" + messageId)
        ).build();
    }

    @GetMapping("/{messageId}")
    public ResponseEntity<MessageResponseDto> findMessage(@PathVariable final Long rollingpaperId,
                                                          @PathVariable final Long messageId) {
        final MessageResponseDto messageResponse = messageService.findMessage(messageId);
        return ResponseEntity.ok(messageResponse);
    }

    @PutMapping("/{messageId}")
    public ResponseEntity<Void> updateMessageContent(
            @RequestBody @Valid final MessageUpdateContentRequest messageUpdateContentRequest,
            @PathVariable final Long rollingpaperId,
            @PathVariable final Long messageId) {
        messageService.updateContent(messageId, messageUpdateContentRequest.getContent());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable final Long rollingpaperId,
                                              @PathVariable final Long messageId) {
        messageService.deleteMessage(messageId);
        return ResponseEntity.noContent().build();
    }
}
