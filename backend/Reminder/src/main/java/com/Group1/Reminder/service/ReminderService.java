package com.Group1.Reminder.service;

import com.Group1.Reminder.dto.ReminderDTO;
import com.Group1.Reminder.feign.eventClient;
import com.Group1.Reminder.feign.userClient;
import com.Group1.Reminder.model.Reminder;
import com.Group1.Reminder.dto.User;
import com.Group1.Reminder.dto.eventModel;
import com.Group1.Reminder.repository.ReminderRepository;
import com.Group1.Reminder.dto.Response;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import com.twilio.type.Twiml;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private eventClient eventclient;

    @Autowired
    private userClient userclient;


    public Response<ReminderDTO> createReminder(ReminderDTO reminderDTO) {
        Reminder reminder = mapToEntity(reminderDTO);
        reminder = reminderRepository.save(reminder);
        return new Response<>("Reminder created successfully", mapToDTO(reminder));
    }


    public Response<ReminderDTO> updateReminder(String remId, ReminderDTO reminderDTO) {
        Reminder reminder = reminderRepository.findById(remId)
                .orElseThrow(() -> new RuntimeException("Reminder not found with ID: " + remId));

        reminder.setEventId(reminderDTO.getEventId());
        reminder.setUserId(reminderDTO.getUserId());
        reminder.setNeedSms(reminderDTO.isNeedSms());
        reminder.setNeedCall(reminderDTO.isNeedCall());
        reminder.setNeedEmail(reminderDTO.isNeedEmail());

        reminder = reminderRepository.save(reminder);
        return new Response<>("Reminder updated successfully", mapToDTO(reminder));
    }


    public Response<String> deleteReminder(String remId) {
        reminderRepository.findById(remId)
                .orElseThrow(() -> new RuntimeException("Reminder not found with ID: " + remId));
        reminderRepository.deleteById(remId);
        return new Response<>("Reminder deleted successfully", null);
    }


    public Response<ReminderDTO> getReminderById(String remId) {
        Reminder reminder = reminderRepository.findById(remId)
                .orElseThrow(() -> new RuntimeException("Reminder not found with ID: " + remId));
        return new Response<>("Reminder retrieved successfully", mapToDTO(reminder));
    }


    public Response<List<ReminderDTO>> getAllReminders() {
        List<Reminder> reminders = reminderRepository.findAll();
        List<ReminderDTO> reminderDTOs = reminders.stream().map(this::mapToDTO).collect(Collectors.toList());
        return new Response<>("All reminders retrieved successfully", reminderDTOs);
    }

    private ReminderDTO mapToDTO(Reminder reminder) {
        ReminderDTO reminderDTO = new ReminderDTO();
        reminderDTO.setEventId(reminder.getEventId());
        reminderDTO.setUserId(reminder.getUserId());
        reminderDTO.setNeedSms(reminder.isNeedSms());
        reminderDTO.setNeedCall(reminder.isNeedCall());
        reminderDTO.setNeedEmail(reminder.isNeedEmail());
        return reminderDTO;
    }

    private Reminder mapToEntity(ReminderDTO reminderDTO) {
        Reminder reminder = new Reminder();
        reminder.setEventId(reminderDTO.getEventId());
        reminder.setUserId(reminderDTO.getUserId());
        reminder.setNeedSms(reminderDTO.isNeedSms());
        reminder.setNeedCall(reminderDTO.isNeedCall());
        reminder.setNeedEmail(reminderDTO.isNeedEmail());
        return reminder;
    }

    public String SendSms(String remId) {
    eventModel event = eventclient.getEvent(reminderRepository.findById(remId).get().getEventId());
    User user = userclient.getResidentById(reminderRepository.findById(remId).get().getUserId());
    String message = "we have an "+ event.getEventTitle() +" event on " + formatDateTime(event.getEventDate());
        Message.creator(new PhoneNumber(user.getPhoneNumber()), new PhoneNumber("+15102963260"),
                message).create();
        return "you may receive a message now!!!";
    }

    public String SendCall(String remId) {
        eventModel event = eventclient.getEvent(reminderRepository.findById(remId).get().getEventId());
        User user = userclient.getResidentById(reminderRepository.findById(remId).get().getUserId());
        String message = "we have an "+ event.getEventTitle() +" event on " + formatDateTime(event.getEventDate());
        Call.creator(new PhoneNumber(user.getPhoneNumber()),
                        new PhoneNumber("+15102963260"),
                        new Twiml("<Response><Say>"+message+"</Say></Response>"))
                .create();
        return "you may receive a call now!!!";
    }

    public String formatDateTime(LocalDateTime dateTime) {
        int day = dateTime.getDayOfMonth();
        String daySuffix = getDaySuffix(day);

        String month = dateTime.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
        int hour = dateTime.getHour() % 12 == 0 ? 12 : dateTime.getHour() % 12;
        int minute = dateTime.getMinute();
        String amPm = dateTime.getHour() >= 12 ? "PM" : "AM";

        return String.format("%d%s %s at %d:%02d%s", day, daySuffix, month, hour, minute, amPm);
    }

    private static String getDaySuffix(int day) {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }
}

