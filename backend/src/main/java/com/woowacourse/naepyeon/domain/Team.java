package com.woowacourse.naepyeon.domain;

import com.woowacourse.naepyeon.exception.ExceedTeamNameLengthException;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Team {

    public static final int MAX_TEAMNAME_LENGTH = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long id;

    @Column(name = "team_name", length = 20, nullable = false, unique = true)
    private String name;

    public Team(final String name) {
        validateTeam(name);
        this.name = name;
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
