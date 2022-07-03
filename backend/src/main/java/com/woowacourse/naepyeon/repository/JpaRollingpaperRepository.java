package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.repository.jpa.RollingpaperJpaDao;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JpaRollingpaperRepository implements RollingpaperRepository {

    private final RollingpaperJpaDao rollingpaperJpaDao;

    @Override
    public Long save(final Rollingpaper rollingpaper) {
        return rollingpaperJpaDao.save(rollingpaper)
                .getId();
    }

    @Override
    public Optional<Rollingpaper> findById(final Long id) {
        return rollingpaperJpaDao.findById(id);
    }

    @Override
    public void update(final Long id, final String newTitle) {
        final Rollingpaper rollingpaper = rollingpaperJpaDao.findById(id)
                .orElseThrow(IllegalArgumentException::new);
        rollingpaper.changeTitle(newTitle);
    }

    @Override
    public void delete(final Long id) {
        rollingpaperJpaDao.deleteById(id);
    }
}
