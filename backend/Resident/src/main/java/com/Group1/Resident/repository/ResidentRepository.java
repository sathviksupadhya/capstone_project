package com.Group1.Resident.repository;

import com.Group1.Resident.model.Resident;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResidentRepository extends JpaRepository<Resident,Integer> {
    Optional<Resident> findByEmail(String email);
}
