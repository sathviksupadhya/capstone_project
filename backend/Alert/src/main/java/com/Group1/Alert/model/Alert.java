package com.Group1.Alert.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Alert {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int alertId;
    private int eventId;
    private int userId;
    private boolean hasSeen;
}
