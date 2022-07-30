package com.woowacourse.naepyeon.service.dto;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ReceivedRollingpapersResponseDto {

    private Long totalCount;
    private int currentPage;
    private List<ReceivedRollingpaperResponseDto> rollingpapers;
}
