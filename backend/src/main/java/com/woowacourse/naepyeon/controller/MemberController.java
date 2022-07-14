package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import com.woowacourse.naepyeon.service.MemberService;
import java.net.URI;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Void> createMember(
            @RequestBody @Valid final MemberRegisterRequest memberRegisterRequest) {
        memberService.save(memberRegisterRequest.getUsername(), memberRegisterRequest.getEmail(),
                memberRegisterRequest.getPassword());
        return ResponseEntity.created(URI.create("/api/v1/members/me")).build();
    }

    @PutMapping("/{memberId}")
    public ResponseEntity<Void> updateMember(@PathVariable final Long memberId,
                                             @RequestBody @Valid final MemberUpdateRequest memberUpdateRequest) {
        memberService.updateUsername(memberId, memberUpdateRequest.getUsername());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<Void> deleteMember(@PathVariable final Long memberId) {
        memberService.delete(memberId);
        return ResponseEntity.noContent().build();
    }
}