package com.Group1.Alert.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AlertDto {
    private int alertId;
    private int eventId;
    private int userId;
    private boolean hasSeen;
}
