package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.auth.AuthenticationPrincipal;
import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.LoginMemberRequest;
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
    public ResponseEntity<CreateResponse> createMessage(@AuthenticationPrincipal LoginMemberRequest loginMemberRequest,
                                                        @RequestBody @Valid final MessageRequest messageRequest,
                                                        @PathVariable final Long rollingpaperId) {
        final Long messageId =
                messageService.saveMessage(messageRequest.getContent(), messageRequest.getColor(), rollingpaperId,
                        loginMemberRequest.getId());
        return ResponseEntity.created(
                URI.create("/api/v1/rollingpapers/" + rollingpaperId + "/messages/" + messageId)
        ).body(new CreateResponse(messageId));
    }

    @GetMapping("/{messageId}")
    public ResponseEntity<MessageResponseDto> findMessage(
            @AuthenticationPrincipal LoginMemberRequest loginMemberRequest,
            @PathVariable final Long rollingpaperId,
            @PathVariable final Long messageId) {
        final MessageResponseDto messageResponse = messageService.findMessage(messageId, rollingpaperId);
        return ResponseEntity.ok(messageResponse);
    }

    @PutMapping("/{messageId}")
    public ResponseEntity<Void> updateMessage(
            @AuthenticationPrincipal LoginMemberRequest loginMemberRequest,
            @RequestBody @Valid final MessageUpdateContentRequest messageUpdateContentRequest,
            @PathVariable final Long rollingpaperId,
            @PathVariable final Long messageId) {
        messageService.updateMessage(
                messageId,
                messageUpdateContentRequest.getContent(),
                messageUpdateContentRequest.getColor(),
                loginMemberRequest.getId()
        );
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<Void> deleteMessage(@AuthenticationPrincipal LoginMemberRequest loginMemberRequest,
                                              @PathVariable final Long rollingpaperId,
                                              @PathVariable final Long messageId) {
        messageService.deleteMessage(messageId, loginMemberRequest.getId());
        return ResponseEntity.noContent().build();
    }
}
