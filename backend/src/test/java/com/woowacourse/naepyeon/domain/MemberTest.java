package com.woowacourse.naepyeon.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.exception.ExceedMemberUsernameLengthException;
import com.woowacourse.naepyeon.exception.InvalidMemberEmailException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class MemberTest {

    @ParameterizedTest
    @ValueSource(strings = {"a", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"})
    @DisplayName("이름은 1~64자 까지 가능하다.")
    void checkUsername(final String name) {

        assertThatCode(() -> new Member(name, "email@email.com", Platform.KAKAO, "1"))
                .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @DisplayName("이름은 1~64자가 아니라면 예외가 발생한다.")
    @ValueSource(strings = {"", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"})
    void createSizeWrongUsername(final String invalidUsername) {
        assertThatThrownBy(() -> new Member(invalidUsername, "email@email.com", Platform.KAKAO, "1"))
                .isInstanceOf(ExceedMemberUsernameLengthException.class);
    }

    @ParameterizedTest
    @ValueSource(strings = {"email@email", "email.com", "email@email."})
    @DisplayName("유효하지 않은 이메일로 유저를 생성하면 예외가 발생한다.")
    void createWithWrongEmail(final String invalidUserEmail) {
        assertThatThrownBy(() -> new Member("zero0제로", invalidUserEmail, Platform.KAKAO, "1"))
                .isInstanceOf(InvalidMemberEmailException.class);
    }

    @Test
    @DisplayName("유저이름을 변경할 수 있다.")
    void changeUsername() {
        final Member member = new Member("제로0zeoro", "email@email.com", Platform.KAKAO, "1");
        final String expected = "zero0제로";

        member.changeUsername(expected);

        assertThat(member.getUsername()).isEqualTo(expected);
    }

    @ParameterizedTest
    @DisplayName("유저 이름을 1자 이상 64자 이하로 변경하지 않은 경우 예외를 발생시킨다.")
    @ValueSource(strings = {"", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"})
    void changeExceedLengthUserName(final String updateUsername) {
        final String validUsername = "제로0zero";
        final Member member = new Member(validUsername, "email@email.com", Platform.KAKAO, "1");

        assertThatThrownBy(() -> member.changeUsername(updateUsername))
                .isInstanceOf(ExceedMemberUsernameLengthException.class);
    }
}
