package com.Group1.Resident.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Resident {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int residentId;
    private String email;
    private String phoneNumber;
    private String image;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private AccountStatus status;
}
