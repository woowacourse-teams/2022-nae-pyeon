package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.auth.AuthenticationPrincipal;
import com.woowacourse.naepyeon.controller.dto.LoginMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import com.woowacourse.naepyeon.service.MemberService;
import com.woowacourse.naepyeon.service.dto.MemberResponseDto;
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
    public ResponseEntity<Void> createMember(
            @RequestBody @Valid final MemberRegisterRequest memberRegisterRequest) {
        memberService.save(memberRegisterRequest.getUsername(), memberRegisterRequest.getEmail(),
                memberRegisterRequest.getPassword());
        return ResponseEntity.created(URI.create("/api/v1/members/me")).build();
    }

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> findMember(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest) {
        final MemberResponseDto memberResponseDto = memberService.findById(loginMemberRequest.getId());
        return ResponseEntity.ok().body(memberResponseDto);
    }

    @PutMapping("/me")
    public ResponseEntity<Void> updateMember(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @RequestBody @Valid final MemberUpdateRequest memberUpdateRequest) {
        memberService.updateUsername(loginMemberRequest.getId(), memberUpdateRequest.getUsername());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMember(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest) {
        memberService.delete(loginMemberRequest.getId());
        return ResponseEntity.noContent().build();
    }
}