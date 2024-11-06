package com.Group1.Feedback.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FeedbackDto {
    private int feedbackId;
    private String feedbackText;
    private int eventId;
    private int userId;
    private String userName;
}
