package com.woowacourse.naepyeon.repository.refreshtoken;

import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>, RefreshTokenRepositoryCustom {

    Optional<RefreshToken> findByValue(final String value);
    int deleteByValue(final String value);
}
