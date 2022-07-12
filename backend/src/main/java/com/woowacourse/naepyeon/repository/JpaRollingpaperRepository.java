package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.repository.jpa.RollingpaperJpaDao;
import java.util.List;
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
    public Optional<Rollingpaper> findById(final Long rollingpaperId) {
        return rollingpaperJpaDao.findById(rollingpaperId);
    }

    @Override
    public List<Rollingpaper> findByTeamId(final Long teamId) {
        return rollingpaperJpaDao.findByTeamId(teamId);
    }

    @Override
    public void update(final Long rollingpaperId, final String newTitle) {
        final Rollingpaper rollingpaper = rollingpaperJpaDao.findById(rollingpaperId)
                .orElseThrow(IllegalArgumentException::new);
        rollingpaper.changeTitle(newTitle);
    }

    @Override
    public void delete(final Long rollingpaperId) {
        rollingpaperJpaDao.deleteById(rollingpaperId);
    }
}
