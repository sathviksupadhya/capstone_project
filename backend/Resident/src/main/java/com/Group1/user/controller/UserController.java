package com.Group1.user.controller;

import com.Group1.user.dto.Response;
import com.Group1.user.dto.UserDto;
import com.Group1.user.model.User;
import com.Group1.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/residents")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create/{id}")
    public String create(@PathVariable String id) {
        return userService.createtuple(id);
    }


    @PutMapping("/{userId}/action")
    public ResponseEntity<Response<UserDto>> approveOrRejectResident(
            @PathVariable String userId,
            @RequestParam("action") String action) {
        Response<UserDto> response = userService.approveResidentRequest(userId, action);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<Response<UserDto>> updateResident(
            @PathVariable String userId,
            @RequestBody UserDto userDto) {
        Response<UserDto> response = userService.updateResident(userId, userDto);
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity<Response<String>> deleteResident(
            @PathVariable String userId) {
        Response<String> response = userService.deleteResident(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public User getResidentById(@PathVariable String userId) {
        return userService.getResidentById(userId);
    }


    @GetMapping("/all")
    public ResponseEntity<Response<List<UserDto>>> getAllResidents() {
        Response<List<UserDto>> response = userService.getAllResidents();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/allUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
