package com.Group1.Resident.service;
import com.Group1.Resident.dto.ResidentDTO;
import com.Group1.Resident.dto.Response;
import com.Group1.Resident.model.AccountStatus;
import com.Group1.Resident.model.Resident;
import com.Group1.Resident.model.Role;
import com.Group1.Resident.repository.ResidentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ResidentService {

    @Autowired
    private ResidentRepository residentRepository;

    // Initialize the first admin user at application startup
    @EventListener(ApplicationReadyEvent.class)
    public void initializeAdminUser() {
        if (residentRepository.findByEmail("admin@example.com").isEmpty()) {
            Resident admin = new Resident();
            admin.setEmail("admin@example.com");
            admin.setPhoneNumber("1234567890");
            admin.setImage("defaultAdminImage.png");
            admin.setRole(Role.ADMIN);
            admin.setStatus(AccountStatus.APPROVED);
            residentRepository.save(admin);
        }
    }

    // Create a new resident - Default isAdminRequest to false if not provided
    public Response<ResidentDTO> createResident(ResidentDTO residentDTO) {
        return createResident(residentDTO, false); // Default isAdminRequest = false
    }

    // Overloaded method to create resident with specified isAdminRequest
    public Response<ResidentDTO> createResident(ResidentDTO residentDTO, boolean isAdminRequest) {
        if (residentDTO.getRole() == null) {
            residentDTO.setRole(Role.RESIDENT); // Default to RESIDENT role if none specified
        }

        Resident resident = mapToEntity(residentDTO);
        resident.setStatus(isAdminRequest ? AccountStatus.APPROVED : AccountStatus.PENDING);

        resident = residentRepository.save(resident);
        String message = isAdminRequest ? "Resident created and approved successfully" : "Resident registration request sent for approval";
        return new Response<>(message, mapToDTO(resident));
    }

    // Approve or reject a pending resident request - Only accessible by ADMIN
    public Response<ResidentDTO> approveResidentRequest(int residentId, String action) {
        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + residentId));

        // Only allow approval/rejection if the resident is currently pending
        if (resident.getStatus() != AccountStatus.PENDING) {
            throw new RuntimeException("Only pending residents can be approved or rejected.");
        }

        if ("Approve".equalsIgnoreCase(action)) {
            resident.setStatus(AccountStatus.APPROVED);
        } else if ("Reject".equalsIgnoreCase(action)) {
            resident.setStatus(AccountStatus.REJECTED);
        } else {
            throw new RuntimeException("Invalid action. Use 'Approve' or 'Reject'.");
        }

        residentRepository.save(resident);
        String message = "Approve".equalsIgnoreCase(action) ? "Resident approved successfully" : "Resident rejected successfully";
        return new Response<>(message, mapToDTO(resident));
    }

    // Update an existing resident - Only ADMIN can change role; residents can update their own details
    public Response<ResidentDTO> updateResident(int residentId, ResidentDTO residentDTO, boolean isAdminRequest) {
        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + residentId));

        if (!isAdminRequest && residentDTO.getRole() != null && !residentDTO.getRole().equals(resident.getRole())) {
            throw new RuntimeException("Resident cannot update their role.");
        }

        resident.setEmail(residentDTO.getEmail());
        resident.setPhoneNumber(residentDTO.getPhoneNumber());
        resident.setImage(residentDTO.getImage());

        if (isAdminRequest && residentDTO.getRole() != null) {
            resident.setRole(residentDTO.getRole());
        }

        resident = residentRepository.save(resident);
        return new Response<>("Resident updated successfully", mapToDTO(resident));
    }

    // Delete a resident by ID - Only ADMIN can delete residents
    public Response<String> deleteResident(int residentId, boolean isAdminRequest) {
        if (!isAdminRequest) {
            throw new RuntimeException("Only Admin can delete residents.");
        }

        residentRepository.findById(residentId)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + residentId));
        residentRepository.deleteById(residentId);
        return new Response<>("Resident deleted successfully", null);
    }

    // Get a resident by ID - Only APPROVED residents are accessible
    public Response<ResidentDTO> getResidentById(int residentId) {
        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + residentId));

        if (resident.getStatus() != AccountStatus.APPROVED) {
            throw new RuntimeException("Resident is not approved.");
        }

        return new Response<>("Resident retrieved successfully", mapToDTO(resident));
    }

    // Get all residents - Now accessible to any user, no admin check required
    public Response<List<ResidentDTO>> getAllResidents() {
        List<Resident> residents = residentRepository.findAll()
                .stream()
                .filter(resident -> resident.getStatus() == AccountStatus.APPROVED)
                .toList();
        List<ResidentDTO> residentDTOs = residents.stream().map(this::mapToDTO).collect(Collectors.toList());
        return new Response<>("Approved residents retrieved successfully", residentDTOs);
    }

    // Helper method to map entity to DTO, including residentId
    private ResidentDTO mapToDTO(Resident resident) {
        ResidentDTO residentDTO = new ResidentDTO();
        residentDTO.setResidentId(resident.getResidentId()); // Ensure residentId is mapped
        residentDTO.setEmail(resident.getEmail());
        residentDTO.setPhoneNumber(resident.getPhoneNumber());
        residentDTO.setImage(resident.getImage());
        residentDTO.setRole(resident.getRole());
        residentDTO.setStatus(resident.getStatus());
        return residentDTO;
    }

    // Helper method to map DTO to entity
    private Resident mapToEntity(ResidentDTO residentDTO) {
        Resident resident = new Resident();
        resident.setResidentId(residentDTO.getResidentId()); // Ensure residentId is mapped back if necessary
        resident.setEmail(residentDTO.getEmail());
        resident.setPhoneNumber(residentDTO.getPhoneNumber());
        resident.setImage(residentDTO.getImage());
        resident.setRole(residentDTO.getRole());
        resident.setStatus(residentDTO.getStatus());
        return resident;
    }
}
