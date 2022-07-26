package com.woowacourse.naepyeon.domain;

import com.woowacourse.naepyeon.exception.ExceedTeamNameLengthException;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "team")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Team extends BaseEntity {

    public static final int MAX_TEAMNAME_LENGTH = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long id;

    @Column(name = "team_name", length = 20, nullable = false, unique = true)
    private String name;

    @Column(name = "description", length = 100, nullable = false)
    private String description;

    @Column(name = "emoji", nullable = false)
    private String emoji;

    @Column(name = "color", length = 15, nullable = false)
    private String color;

    public Team(final String name, final String description, final String emoji, final String color) {
        validateTeam(name);
        this.name = name;
        this.description = description;
        this.emoji = emoji;
        this.color = color;
    }

    public void changeName(final String name) {
        validateTeam(name);
        this.name = name;
    }

    private void validateTeam(final String name) {
        if (name.length() > MAX_TEAMNAME_LENGTH) {
            throw new ExceedTeamNameLengthException(name);
        }
    }
}
