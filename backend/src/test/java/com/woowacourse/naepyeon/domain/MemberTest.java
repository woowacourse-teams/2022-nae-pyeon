package com.woowacourse.naepyeon.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.exception.ExceedMemberUsernameLengthException;
import com.woowacourse.naepyeon.exception.InvalidMemberEmailException;
import com.woowacourse.naepyeon.exception.InvalidMemberUsernameException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class MemberTest {

    @Test
    @DisplayName("이름은 1~20자, 한글, 숫자, 영어만 가능하다.")
    void checkUsername() {
        final String validUsername = "제로0zero";

        assertThatCode(() -> new Member(validUsername, "email@email.com", Platform.KAKAO, 500000L))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("한글, 숫자, 영어 외의 문자가 포함된 유저이름으로 생성하면 예외가 발생한다.")
    void createWithWrongUsername() {
        final String invalidUsername = "제로0zero@";

        assertThatThrownBy(() -> new Member(invalidUsername, "email@email.com", Platform.KAKAO, 500000L))
                .isInstanceOf(InvalidMemberUsernameException.class);
    }

    @ParameterizedTest
    @DisplayName("이름은 1~20자가 아니라면 예외가 발생한다.")
    @ValueSource(strings = {"", "012345678901234567891"})
    void createSizeWrongUsername(final String invalidUsername) {
        assertThatThrownBy(() -> new Member(invalidUsername, "email@email.com", Platform.KAKAO, 500000L))
                .isInstanceOf(ExceedMemberUsernameLengthException.class);
    }

    @ParameterizedTest
    @ValueSource(strings = {"email@email", "email.com", "email@email."})
    @DisplayName("유효하지 않은 이메일로 유저를 생성하면 예외가 발생한다.")
    void createWithWrongEmail(final String invalidUserEmail) {
        assertThatThrownBy(() -> new Member("zero0제로", invalidUserEmail, Platform.KAKAO, 500000L))
                .isInstanceOf(InvalidMemberEmailException.class);
    }

    @Test
    @DisplayName("유저이름을 변경할 수 있다.")
    void changeUsername() {
        final Member member = new Member("제로0zeoro", "email@email.com", Platform.KAKAO, 500000L);
        final String expected = "zero0제로";

        member.changeUsername(expected);

        assertThat(member.getUsername()).isEqualTo(expected);
    }

    @ParameterizedTest
    @DisplayName("유저 이름을 2자 이상 20자 이하로 변경하지 않은 경우 예외를 발생시킨다.")
    @ValueSource(strings = {"a", "abcdefghijklmnopqrstu"})
    void changeExceedLengthUserName(final String updateUsername) {
        final String validUsername = "제로0zero";
        final Member member = new Member(validUsername, "email@email.com", Platform.KAKAO, 500000L);

        assertThatThrownBy(() -> member.changeUsername(updateUsername))
                .isInstanceOf(ExceedMemberUsernameLengthException.class);
    }

    @Test
    @DisplayName("한글, 숫자, 영어 외의 문자가 포함된 유저이름으로 변경하면 예외가 발생한다.")
    void changeWithWrongUsername() {
        final String validUsername = "제로0zero";
        final Member member = new Member(validUsername, "email@email.com", Platform.KAKAO, 500000L);
        final String invalidUsername = "제로0zero@";

        assertThatThrownBy(() -> member.changeUsername(invalidUsername))
                .isInstanceOf(InvalidMemberUsernameException.class);
    }
}
