package com.Group1.user.controller;

import com.Group1.user.dto.Response;
import com.Group1.user.dto.UserDto;
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

    // Endpoint to create a new resident - Defaults to isAdminRequest = false in the service
    @PostMapping("/create")
    public ResponseEntity<Response<UserDto>> createResident(@RequestBody UserDto userDto) {
        Response<UserDto> response = userService.createResident(userDto);
        return ResponseEntity.ok(response);
    }

    // Endpoint for admin to approve or reject a pending resident request using "Approve" or "Reject"
    @PutMapping("/{userId}/action")
    public ResponseEntity<Response<UserDto>> approveOrRejectResident(
            @PathVariable String userId,
            @RequestParam("action") String action) {
        Response<UserDto> response = userService.approveResidentRequest(userId, action);
        return ResponseEntity.ok(response);
    }

    // Endpoint to update an existing resident's information
    @PutMapping("/{userId}/update")
    public ResponseEntity<Response<UserDto>> updateResident(
            @PathVariable String userId,
            @RequestBody UserDto userDto,
            @RequestParam(value = "isAdminRequest", defaultValue = "false") boolean isAdminRequest) {
        Response<UserDto> response = userService.updateResident(userId, userDto, isAdminRequest);
        return ResponseEntity.ok(response);
    }

    // Endpoint to delete a resident by ID (Admin only)
    @DeleteMapping("/{userId}")
    public ResponseEntity<Response<String>> deleteResident(
            @PathVariable String userId,
            @RequestParam(value = "isAdminRequest", defaultValue = "false") boolean isAdminRequest) {
        Response<String> response = userService.deleteResident(userId, isAdminRequest);
        return ResponseEntity.ok(response);
    }

    // Endpoint to retrieve a resident by ID
    @GetMapping("/{userId}")
    public ResponseEntity<Response<UserDto>> getResidentById(@PathVariable String userId) {
        Response<UserDto> response = userService.getResidentById(userId);
        return ResponseEntity.ok(response);
    }

    // Endpoint to retrieve all approved residents (accessible by any user)
    @GetMapping("/all")
    public ResponseEntity<Response<List<UserDto>>> getAllResidents() {
        Response<List<UserDto>> response = userService.getAllResidents();
        return ResponseEntity.ok(response);
    }
}
