package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.domain.Team;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class ReceivedRollingpaperResponseDto {

    private Long id;
    private String title;
    private Long teamId;
    private String teamName;

    public static ReceivedRollingpaperResponseDto of(final Long id, final String title, final Team team) {
        return new ReceivedRollingpaperResponseDto(id, title, team.getId(), team.getName());
    }
}
