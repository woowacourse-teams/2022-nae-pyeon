package com.woowacourse.naepyeon.service.dto;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class WrittenMessagesResponseDto {

    private Long totalCount;
    private int currentPage;
    private List<WrittenMessageResponseDto> messages;
}
