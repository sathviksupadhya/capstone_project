package com.Group1.Resident.controller;

import com.Group1.Resident.dto.Response;
import com.Group1.Resident.dto.ResidentDTO;
import com.Group1.Resident.service.ResidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/residents")
public class ResidentController {

    @Autowired
    private ResidentService residentService;

    // Endpoint to create a new resident - Defaults to isAdminRequest = false in the service
    @PostMapping("/create")
    public ResponseEntity<Response<ResidentDTO>> createResident(@RequestBody ResidentDTO residentDTO) {
        Response<ResidentDTO> response = residentService.createResident(residentDTO);
        return ResponseEntity.ok(response);
    }

    // Endpoint for admin to approve or reject a pending resident request using "Approve" or "Reject"
    @PutMapping("/{residentId}/action")
    public ResponseEntity<Response<ResidentDTO>> approveOrRejectResident(
            @PathVariable int residentId,
            @RequestParam("action") String action) {
        Response<ResidentDTO> response = residentService.approveResidentRequest(residentId, action);
        return ResponseEntity.ok(response);
    }

    // Endpoint to update an existing resident's information
    @PutMapping("/{residentId}/update")
    public ResponseEntity<Response<ResidentDTO>> updateResident(
            @PathVariable int residentId,
            @RequestBody ResidentDTO residentDTO,
            @RequestParam(value = "isAdminRequest", defaultValue = "false") boolean isAdminRequest) {
        Response<ResidentDTO> response = residentService.updateResident(residentId, residentDTO, isAdminRequest);
        return ResponseEntity.ok(response);
    }

    // Endpoint to delete a resident by ID (Admin only)
    @DeleteMapping("/{residentId}")
    public ResponseEntity<Response<String>> deleteResident(
            @PathVariable int residentId,
            @RequestParam(value = "isAdminRequest", defaultValue = "false") boolean isAdminRequest) {
        Response<String> response = residentService.deleteResident(residentId, isAdminRequest);
        return ResponseEntity.ok(response);
    }

    // Endpoint to retrieve a resident by ID
    @GetMapping("/{residentId}")
    public ResponseEntity<Response<ResidentDTO>> getResidentById(@PathVariable int residentId) {
        Response<ResidentDTO> response = residentService.getResidentById(residentId);
        return ResponseEntity.ok(response);
    }

    // Endpoint to retrieve all approved residents (accessible by any user)
    @GetMapping("/all")
    public ResponseEntity<Response<List<ResidentDTO>>> getAllResidents() {
        Response<List<ResidentDTO>> response = residentService.getAllResidents();
        return ResponseEntity.ok(response);
    }
}
