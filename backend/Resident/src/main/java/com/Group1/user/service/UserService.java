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

//    @EventListener(ApplicationReadyEvent.class)
//    public void initializeAdminUser() {
//        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
//            User admin = new User();
//            admin.setEmail("admin@example.com");
//            admin.setPhoneNumber("1234567890");
//            admin.setImage("defaultAdminImage.png");
//            admin.setStatus("APPROVED");
//            userRepository.save(admin);
//        }
//    }

    public Response<UserDto> approveResidentRequest(String userId, String action) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + userId));
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


    public Response<UserDto> updateResident(String userid, UserDto userDto) {
        User user = userRepository.findById(userid)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + userid));


        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setImage(userDto.getImage());

        user = userRepository.save(user);
        return new Response<>("Resident updated successfully", mapToDTO(user));
    }

    public Response<String> deleteResident(String userid) {
        userRepository.findById(userid)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + userid));
        userRepository.deleteById(userid);
        return new Response<>("Resident deleted successfully", null);
    }

    public User getResidentById(String userid) {
        User user = userRepository.findById(userid)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + userid));

        if (!user.getStatus().equalsIgnoreCase("APPROVED")) {
            throw new RuntimeException("Resident is not approved.");
        }

        return user;
    }

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
        userDto.setStatus(user.getStatus());
        return userDto;
    }

    private User mapToEntity(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setImage(userDto.getImage());
        user.setStatus(userDto.getStatus());
        return user;
    }

    public List<User> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .filter(user -> user.getStatus().equalsIgnoreCase("APPROVED"))
                .toList();
    }

    public String createtuple(String id) {
        User user = new User();
        user.setUserId(id);
        user.setStatus("PENDING");
        userRepository.save(user);
        return "tuple created";
    }
}
