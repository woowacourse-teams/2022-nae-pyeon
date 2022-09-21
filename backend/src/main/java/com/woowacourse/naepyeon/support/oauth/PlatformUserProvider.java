package com.woowacourse.naepyeon.support.oauth;

import com.woowacourse.naepyeon.service.dto.PlatformUserDto;

public interface PlatformUserProvider {
    PlatformUserDto getPlatformUser(String authorizationCode, String redirectUri);
}
