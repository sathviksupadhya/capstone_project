package com.Group1.Alert.feign;

import com.Group1.Alert.model.User;
import org.springframework.cloud.client.loadbalancer.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name="User" , url = "http://localhost:9991/api/residents")
public interface feignClient {

    @GetMapping("/allUsers")
    public List<User> getAllUsers();
}
