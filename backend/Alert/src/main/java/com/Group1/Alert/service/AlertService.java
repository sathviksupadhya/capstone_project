package com.Group1.Alert.service;

import com.Group1.Alert.dto.AlertDto;
import com.Group1.Alert.model.Alert;
import com.Group1.Alert.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlertService {
    @Autowired
    private AlertRepository alertRepository;

    // Convert entity to DTO
    private AlertDto entityToDto(Alert alert) {
        AlertDto dto = new AlertDto();
        dto.setAlertId(alert.getAlertId());
        dto.setEventId(alert.getEventId());
        dto.setUserId(alert.getUserId());
        dto.setHasSeen(alert.isHasSeen());
        return dto;
    }

    // Convert DTO to entity
    private Alert dtoToEntity(AlertDto alertDto) {
        Alert alert = new Alert();
        alert.setAlertId(alertDto.getAlertId());
        alert.setEventId(alertDto.getEventId());
        alert.setUserId(alertDto.getUserId());
        alert.setHasSeen(alertDto.isHasSeen());
        return alert;
    }

    public List<AlertDto> getAlertByUserId(int userId) {
        List<Alert> alerts = alertRepository.findByUserId(userId);  // Now, this returns a List<Alert>
        return alerts.stream().map(this::entityToDto).collect(Collectors.toList());
    }



    public AlertDto createAlert(AlertDto alertDto) {
        // Create the new alert
        Alert alert = new Alert();
        alert.setUserId(alertDto.getUserId());
        alert.setEventId(alertDto.getEventId());
        alert.setHasSeen(alertDto.isHasSeen());

        // Save the alert to the repository
        Alert savedAlert = alertRepository.save(alert);

        // Convert the saved alert entity to DTO and return it
        return entityToDto(savedAlert);
    }



}
