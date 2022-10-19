package com.woowacourse.naepyeon.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.woowacourse.naepyeon.service.dto.NotificationResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
    }

    @Bean
    public RedisOperations<String, NotificationResponseDto> eventRedisOperations(
            RedisConnectionFactory redisConnectionFactory, ObjectMapper objectMapper) {
        final Jackson2JsonRedisSerializer<NotificationResponseDto> jsonRedisSerializer = new Jackson2JsonRedisSerializer<>(
                NotificationResponseDto.class);
        jsonRedisSerializer.setObjectMapper(objectMapper);
        final RedisTemplate<String, NotificationResponseDto> eventRedisTemplate = new RedisTemplate<>();
        eventRedisTemplate.setConnectionFactory(redisConnectionFactory);
        eventRedisTemplate.setKeySerializer(RedisSerializer.string());
        eventRedisTemplate.setValueSerializer(jsonRedisSerializer);
        eventRedisTemplate.setHashKeySerializer(RedisSerializer.string());
        eventRedisTemplate.setHashValueSerializer(jsonRedisSerializer);
        return eventRedisTemplate;
    }

    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(RedisConnectionFactory redisConnectionFactory) {
        final RedisMessageListenerContainer redisMessageListenerContainer = new RedisMessageListenerContainer();
        redisMessageListenerContainer.setConnectionFactory(redisConnectionFactory);
        return redisMessageListenerContainer;
    }
}
