package com.Group1.Resident.dto;

import com.Group1.Resident.model.AccountStatus;
import com.Group1.Resident.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResidentDTO {
    private int residentId;
    private String email;
    private String phoneNumber;
    private String image;
    private Role role;
    private AccountStatus status;
}
