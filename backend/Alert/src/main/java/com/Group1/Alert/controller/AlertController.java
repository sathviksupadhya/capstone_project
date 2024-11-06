package com.Group1.Alert.controller;

import com.Group1.Alert.dto.AlertDto;
import com.Group1.Alert.model.Alert;
import com.Group1.Alert.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alert")
public class AlertController {
    @Autowired
    private AlertService alertService;


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AlertDto>> getAlertByUserId(@PathVariable("userId") int userId) {
        List<AlertDto> alerts = alertService.getAlertByUserId(userId);
        return alerts.isEmpty()
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).build()
                : ResponseEntity.ok(alerts);
    }


    @PostMapping
    public ResponseEntity<AlertDto> createAlert(@RequestBody AlertDto alertDto) {

            AlertDto createdAlert = alertService.createAlert(alertDto);
            return new ResponseEntity<>(createdAlert, HttpStatus.CREATED);

    }


}
