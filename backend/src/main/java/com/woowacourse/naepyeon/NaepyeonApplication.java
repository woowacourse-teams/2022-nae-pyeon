package com.woowacourse.naepyeon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class NaepyeonApplication {

    public static void main(String[] args) {
        SpringApplication.run(NaepyeonApplication.class, args);
    }
}
