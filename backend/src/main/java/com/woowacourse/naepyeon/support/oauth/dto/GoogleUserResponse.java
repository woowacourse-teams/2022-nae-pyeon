package com.woowacourse.naepyeon.support.oauth.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class GoogleUserResponse {

        private String id;
        private String email;
        private String verified_email;
        private String name;
        private String given_name;
        private String picture;
        private String locale;

        public String getNickname() {
                return given_name;
        }
}
