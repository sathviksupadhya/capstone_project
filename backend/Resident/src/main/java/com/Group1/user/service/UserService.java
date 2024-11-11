package com.Group1.user.service;
import com.Group1.user.dto.UserDto;
import com.Group1.user.dto.Response;
import com.Group1.user.model.User;
import com.Group1.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Initialize the first admin user at application startup
    @EventListener(ApplicationReadyEvent.class)
    public void initializeAdminUser() {
        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@example.com");
            admin.setPhoneNumber("1234567890");
            admin.setImage("defaultAdminImage.png");
            admin.setRole("ADMIN");
            admin.setStatus("APPROVED");
            userRepository.save(admin);
        }
    }

    // Create a new resident - Default isAdminRequest to false if not provided
//    public Response<UserDto> createResident(UserDto userDto) {
//        return createResident(userDto, false); // Default isAdminRequest = false
//    }

    // Overloaded method to create resident with specified isAdminRequest
    public Response<UserDto> createResident(UserDto userDto) {
            User user = mapToEntity(userDto);
            user.setStatus("PENDING");
            user.setRole("RESIDENT");
            user = userRepository.save(user);
            String message = "Resident registration request sent for approval";
        return new Response<>(message, mapToDTO(user));
    }

    // Approve or reject a pending resident request - Only accessible by ADMIN
    public Response<UserDto> approveResidentRequest(String userId, String action) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + userId));

        // Only allow approval/rejection if the resident is currently pending
        if (!user.getStatus().equalsIgnoreCase("PENDING")) {
            throw new RuntimeException("Only pending residents can be approved or rejected."+ userId + user.getStatus());
        }

        if ("Approve".equalsIgnoreCase(action)) {
            user.setStatus("APPROVED");
        } else if ("Reject".equalsIgnoreCase(action)) {
            user.setStatus("REJECTED");
        } else {
            throw new RuntimeException("Invalid action. Use 'Approve' or 'Reject'.");
        }

        userRepository.save(user);
        String message = "Approve".equalsIgnoreCase(action) ? "Resident approved successfully" : "Resident rejected successfully";
        return new Response<>(message, mapToDTO(user));
    }

    // Update an existing resident - Only ADMIN can change role; residents can update their own details
    public Response<UserDto> updateResident(String userid, UserDto userDto, boolean isAdminRequest) {
        User user = userRepository.findById(userid)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + userid));

        if (!isAdminRequest && userDto.getRole() != null && !userDto.getRole().equals(user.getRole())) {
            throw new RuntimeException("Resident cannot update their role.");
        }

        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setImage(userDto.getImage());

        if (isAdminRequest && userDto.getRole() != null) {
            user.setRole(userDto.getRole());
        }

        user = userRepository.save(user);
        return new Response<>("Resident updated successfully", mapToDTO(user));
    }

    // Delete a resident by ID - Only ADMIN can delete residents
    public Response<String> deleteResident(String userid, boolean isAdminRequest) {
        if (!isAdminRequest) {
            throw new RuntimeException("Only Admin can delete residents.");
        }

        userRepository.findById(userid)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + userid));
        userRepository.deleteById(userid);
        return new Response<>("Resident deleted successfully", null);
    }

    // Get a resident by ID - Only APPROVED residents are accessible
    public User getResidentById(String userid) {
        User user = userRepository.findById(userid)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + userid));

        if (!user.getStatus().equalsIgnoreCase("APPROVED")) {
            throw new RuntimeException("Resident is not approved.");
        }

        return user;
    }

    // Get all residents - Now accessible to any user, no admin check required
    public Response<List<UserDto>> getAllResidents() {
        List<User> users = userRepository.findAll()
                .stream()
                .filter(user -> user.getStatus().equalsIgnoreCase("APPROVED"))
                .toList();
        List<UserDto> userDtos = users.stream().map(this::mapToDTO).collect(Collectors.toList());
        return new Response<>("Approved residents retrieved successfully", userDtos);
    }


    private UserDto mapToDTO(User user) {
        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setImage(user.getImage());
        userDto.setRole(user.getRole());
        userDto.setStatus(user.getStatus());
        return userDto;
    }

    // Helper method to map DTO to entity
    private User mapToEntity(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setImage(userDto.getImage());
        user.setRole(userDto.getRole());
        user.setStatus(userDto.getStatus());
        return user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getStatus().equalsIgnoreCase("APPROVED"))
                .toList();

    }
}
