package com.Group1.Reminder.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReminderDTO {
    private int remId;

    @NotNull(message = "Event ID is required.")
    private int eventId;

    @NotNull(message = "User ID is required.")
    private int userId;

    private boolean needSms;
    private boolean needCall;
    private boolean needEmail;
}
