package com.Group1.user.feign;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "authentication", url = "http://localhost:9997/")
public interface authClient {
}
