package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.domain.Member;
import lombok.Getter;

@Getter
public class MemberResponse {

    private Long id;
    private String username;
    private String email;
    private String password;

    public MemberResponse() {
    }

    public MemberResponse(String username, String email, String password) {
        this(null, username, email, password);
    }

    public MemberResponse(Long id, String username, String email, String password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public static MemberResponse toEntity(Member member) {
        return new MemberResponse(member.getId(), member.getUsername(), member.getEmail(), member.getPassword());
    }
}
