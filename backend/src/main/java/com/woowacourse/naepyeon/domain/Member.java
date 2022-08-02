package com.woowacourse.naepyeon.domain;

import com.woowacourse.naepyeon.exception.ExceedMemberUsernameLengthException;
import com.woowacourse.naepyeon.exception.InvalidMemberEmailException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    public static final int MIN_USERNAME_LENGTH = 1;
    public static final int MAX_USERNAME_LENGTH = 64;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "username", length = 20, nullable = false)
    private String username;

    @Column(name = "email", length = 255, nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "platform")
    private Platform platform;

    @Column(name = "platform_id")
    private String platformId;

    public Member(final String username, final String email, final Platform platform, final String platformId) {
        validateMember(username, email);
        this.username = username;
        this.email = email;
        this.platform = platform;
        this.platformId = platformId;
    }

    public void changeUsername(final String username) {
        validateUsername(username);
        this.username = username;
    }

    private void validateMember(final String username, final String email) {
        validateUsername(username);
        validateEmail(email);
    }

    private void validateUsername(final String username) {
        validateUsernameSize(username);
    }

    private void validateUsernameSize(final String username) {
        if (MIN_USERNAME_LENGTH > username.length() || MAX_USERNAME_LENGTH < username.length()) {
            throw new ExceedMemberUsernameLengthException(username);
        }
    }

    private void validateEmail(final String email) {
        final Matcher matcher = EMAIL_PATTERN.matcher(email);
        if (!matcher.matches()) {
            throw new InvalidMemberEmailException(email);
        }
    }

    public boolean isSameMember(final Long memberId) {
        return this.id.equals(memberId);
    }
}
