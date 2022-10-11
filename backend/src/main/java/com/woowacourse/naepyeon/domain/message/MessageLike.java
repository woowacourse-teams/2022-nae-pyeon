package com.woowacourse.naepyeon.domain.message;

import com.woowacourse.naepyeon.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Getter
@Table(name = "message_like")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MessageLike extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_like_id")
    private Long id;

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "rollingpaper_id")
    private Long rollingpaperId;

    @Column(name = "message_id")
    private Long messageId;

    public MessageLike(Long memberId, Long rollingpaperId, Long messageId) {
        this.memberId = memberId;
        this.rollingpaperId = rollingpaperId;
        this.messageId = messageId;
    }
}
