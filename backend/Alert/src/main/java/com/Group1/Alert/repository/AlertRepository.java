package com.Group1.Alert.repository;

import com.Group1.Alert.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AlertRepository extends JpaRepository<Alert,Integer> {


    List<Alert> findByUserId(int userId);


}
