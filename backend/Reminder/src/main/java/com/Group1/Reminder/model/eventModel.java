package com.Group1.Reminder.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class eventModel {

    private String eventId;
    private String eventTitle;
    private String eventDescription;
    private String eventImg;
    private Date eventDate;
    private String eventType;
    private int userId;

}
