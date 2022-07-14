package com.woowacourse.naepyeon.domain;

import com.woowacourse.naepyeon.exception.ExceedMemberPasswordLengthException;
import com.woowacourse.naepyeon.exception.ExceedMemberUsernameLengthException;
import com.woowacourse.naepyeon.exception.InvalidMemberEmailException;
import com.woowacourse.naepyeon.exception.InvalidMemberPasswordException;
import com.woowacourse.naepyeon.exception.InvalidMemberUsernameException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    public static final int MIN_USERNAME_LENGTH = 2;
    public static final int MAX_USERNAME_LENGTH = 20;
    public static final int MIN_PASSWORD_LENGTH = 8;
    public static final int MAX_PASSWORD_LENGTH = 20;

    private static final Pattern USER_PATTERN = Pattern.compile("^[가-힣a-zA-Z0-9]+$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$");
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{0,}$");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(length = 20, nullable = false)
    private String username;

    @Column(length = 255, nullable = false, unique = true)
    private String email;

    @Column(length = 255, nullable = false)
    private String password;

    public Member(final String username, final String email, final String password) {
        validateMember(username, email, password);
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public void changeUsername(final String username) {
        validateUsername(username);
        this.username = username;
    }

    public void changePassword(final String newPassword) {
        validatePassword(newPassword);
        this.password = newPassword;
    }

    private void validateMember(final String username, final String email, final String password) {
        validateUsername(username);
        validateEmail(email);
        validatePassword(password);
    }

    private void validateUsername(final String username) {
        validateUsernameSize(username);
        validateUsernameRegex(username);
    }

    private void validateUsernameSize(final String username) {
        if (MIN_USERNAME_LENGTH > username.length() || MAX_USERNAME_LENGTH < username.length()) {
            throw new ExceedMemberUsernameLengthException(username);
        }
    }

    private void validateUsernameRegex(final String username) {
        final Matcher matcher = USER_PATTERN.matcher(username);
        if (!matcher.matches()) {
            throw new InvalidMemberUsernameException(username);
        }
    }

    private void validateEmail(final String email) {
        final Matcher matcher = EMAIL_PATTERN.matcher(email);
        if (!matcher.matches()) {
            throw new InvalidMemberEmailException(email);
        }
    }

    private void validatePassword(final String password) {
        validatePasswordSize(password);
        validatePasswordRegex(password);
    }

    private void validatePasswordSize(final String password) {
        if (password.length() < MIN_PASSWORD_LENGTH || password.length() > MAX_PASSWORD_LENGTH) {
            throw new ExceedMemberPasswordLengthException(password);
        }
    }

    private void validatePasswordRegex(final String password) {
        final Matcher matcher = PASSWORD_PATTERN.matcher(password);
        if (!matcher.matches()) {
            throw new InvalidMemberPasswordException(password);
        }
    }
}
