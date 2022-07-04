package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Void> createMember(@RequestBody @Valid MemberRegisterRequest memberRegisterRequest) {
        Long memberId = memberService.save(memberRegisterRequest.toServiceRequest());
        return ResponseEntity.created(URI.create("/api/v1/members/" + memberId)).build();
    }

    @PutMapping("/{memberId}")
    public ResponseEntity<Void> updateMember(@PathVariable Long memberId, @RequestBody @Valid MemberRegisterRequest memberRegisterRequest) {
        memberService.updateUsername(memberId, memberRegisterRequest.getUsername());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long memberId) {
        memberService.delete(memberId);
        return ResponseEntity.noContent().build();
    }
}