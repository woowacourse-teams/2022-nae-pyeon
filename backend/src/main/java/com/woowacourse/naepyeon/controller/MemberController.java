package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.auth.AuthenticationPrincipal;
import com.woowacourse.naepyeon.controller.dto.LoginMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import com.woowacourse.naepyeon.service.MemberService;
import com.woowacourse.naepyeon.service.RollingpaperService;
import com.woowacourse.naepyeon.service.dto.MemberResponseDto;
import com.woowacourse.naepyeon.service.dto.ReceivedRollingpapersResponseDto;
import java.net.URI;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;
    private final RollingpaperService rollingpaperService;

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

    @GetMapping("/me/rollingpapers/received")
    public ResponseEntity<ReceivedRollingpapersResponseDto> findReceivedRollingpapers(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @RequestParam("page") final Integer page,
            @RequestParam("count") final int count
    ) {
        final Pageable pageRequest = PageRequest.of(page, count);
        return ResponseEntity.ok(
                rollingpaperService.findReceivedRollingpapers(loginMemberRequest.getId(), pageRequest)
        );
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