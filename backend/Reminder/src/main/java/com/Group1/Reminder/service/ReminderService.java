package com.Group1.Reminder.service;

import com.Group1.Reminder.dto.ReminderDTO;
import com.Group1.Reminder.model.Reminder;
import com.Group1.Reminder.repository.ReminderRepository;
import com.Group1.Resident.dto.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    // Create a new reminder
    public Response<ReminderDTO> createReminder(ReminderDTO reminderDTO) {
        Reminder reminder = mapToEntity(reminderDTO);
        reminder = reminderRepository.save(reminder);
        return new Response<>("Reminder created successfully", mapToDTO(reminder));
    }

    // Update an existing reminder
    public Response<ReminderDTO> updateReminder(int remId, ReminderDTO reminderDTO) {
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

    // Delete a reminder by ID
    public Response<String> deleteReminder(int remId) {
        reminderRepository.findById(remId)
                .orElseThrow(() -> new RuntimeException("Reminder not found with ID: " + remId));
        reminderRepository.deleteById(remId);
        return new Response<>("Reminder deleted successfully", null);
    }

    // Get a reminder by ID
    public Response<ReminderDTO> getReminderById(int remId) {
        Reminder reminder = reminderRepository.findById(remId)
                .orElseThrow(() -> new RuntimeException("Reminder not found with ID: " + remId));
        return new Response<>("Reminder retrieved successfully", mapToDTO(reminder));
    }

    // Get all reminders
    public Response<List<ReminderDTO>> getAllReminders() {
        List<Reminder> reminders = reminderRepository.findAll();
        List<ReminderDTO> reminderDTOs = reminders.stream().map(this::mapToDTO).collect(Collectors.toList());
        return new Response<>("All reminders retrieved successfully", reminderDTOs);
    }

    // Helper method to map entity to DTO
    private ReminderDTO mapToDTO(Reminder reminder) {
        ReminderDTO reminderDTO = new ReminderDTO();
        reminderDTO.setRemId(reminder.getRemId());
        reminderDTO.setEventId(reminder.getEventId());
        reminderDTO.setUserId(reminder.getUserId());
        reminderDTO.setNeedSms(reminder.isNeedSms());
        reminderDTO.setNeedCall(reminder.isNeedCall());
        reminderDTO.setNeedEmail(reminder.isNeedEmail());
        return reminderDTO;
    }

    // Helper method to map DTO to entity
    private Reminder mapToEntity(ReminderDTO reminderDTO) {
        Reminder reminder = new Reminder();
        reminder.setEventId(reminderDTO.getEventId());
        reminder.setUserId(reminderDTO.getUserId());
        reminder.setNeedSms(reminderDTO.isNeedSms());
        reminder.setNeedCall(reminderDTO.isNeedCall());
        reminder.setNeedEmail(reminderDTO.isNeedEmail());
        return reminder;
    }
}
