package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.auth.AuthenticationPrincipal;
import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.LoginMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.controller.dto.MessageUpdateRequest;
import com.woowacourse.naepyeon.service.MessageService;
import com.woowacourse.naepyeon.service.dto.MessageLikeResponseDto;
import com.woowacourse.naepyeon.service.dto.MessageResponseDto;
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

import javax.validation.Valid;
import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/rollingpapers/{rollingpaperId}/messages")
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<CreateResponse> createMessage(
            @AuthenticationPrincipal final LoginMemberRequest loginMemberRequest,
            @RequestBody @Valid final MessageRequest messageRequest,
            @PathVariable final Long rollingpaperId) {
        final Long messageId = messageService.saveMessage(
                messageRequest.toServiceDto(), rollingpaperId, loginMemberRequest.getId()
        );
        return ResponseEntity.created(
                URI.create("/api/v1/rollingpapers/" + rollingpaperId + "/messages/" + messageId)
        ).body(new CreateResponse(messageId));
    }

    @GetMapping("/{messageId}")
    public ResponseEntity<MessageResponseDto> findMessage(
            @AuthenticationPrincipal final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long rollingpaperId,
            @PathVariable final Long messageId) {
        final MessageResponseDto messageResponse =
                messageService.findMessage(messageId, rollingpaperId, loginMemberRequest.getId());
        return ResponseEntity.ok(messageResponse);
    }

    @PutMapping("/{messageId}")
    public ResponseEntity<Void> updateMessage(
            @AuthenticationPrincipal final LoginMemberRequest loginMemberRequest,
            @RequestBody @Valid final MessageUpdateRequest messageUpdateRequest,
            @PathVariable final Long rollingpaperId,
            @PathVariable final Long messageId) {
        messageService.updateMessage(
                messageId,
                messageUpdateRequest.toServiceDto(),
                loginMemberRequest.getId()
        );
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<Void> deleteMessage(@AuthenticationPrincipal final LoginMemberRequest loginMemberRequest,
                                              @PathVariable final Long rollingpaperId,
                                              @PathVariable final Long messageId) {
        messageService.deleteMessage(messageId, loginMemberRequest.getId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{messageId}/likes")
    public ResponseEntity<MessageLikeResponseDto> likeMessage(
            @AuthenticationPrincipal final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long rollingpaperId,
            @PathVariable final Long messageId) {
        final MessageLikeResponseDto messageLikeResponse =
                messageService.likeMessage(loginMemberRequest.getId(), rollingpaperId, messageId);
        return ResponseEntity.ok(messageLikeResponse);
    }

    @DeleteMapping("/{messageId}/likes")
    public ResponseEntity<MessageLikeResponseDto> dislikeMessage(
            @AuthenticationPrincipal final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long rollingpaperId,
            @PathVariable final Long messageId) {
        final MessageLikeResponseDto messageLikeResponse =
                messageService.dislikeMessage(loginMemberRequest.getId(), rollingpaperId, messageId);
        return ResponseEntity.ok(messageLikeResponse);
    }
}
