package com.woowacourse.naepyeon.repository.refreshtoken;

import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>, RefreshTokenRepositoryCustom {
}
