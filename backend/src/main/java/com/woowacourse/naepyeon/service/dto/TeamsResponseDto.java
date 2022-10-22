package com.woowacourse.naepyeon.service.dto;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class TeamsResponseDto {

    private Long totalCount;
    private int currentPage;
    private List<TeamResponseDto> teams;
}
