package com.woowacourse.naepyeon.service.dto;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RollingpaperResponseDto {

    private Long id;
    private String title;
    private String to;
    private List<MessageResponseDto> messages;
}
