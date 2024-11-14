package com.Group1.Reminder.Controller;

import com.Group1.Reminder.dto.*;
import com.Group1.Reminder.feign.eventClient;
import com.Group1.Reminder.feign.userClient;
import com.Group1.Reminder.repository.ReminderRepository;
import com.Group1.Reminder.service.ReminderService;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reminder")
public class reminderController {

    @Autowired
    private ReminderService reminderService;

    @Autowired
    private eventClient eventclient;

    @Autowired
    private userClient userclient;

    @Autowired
    private ReminderRepository reminderRepository;

    @PostMapping("/create")
    public Response<ReminderDTO> createReminder(@RequestBody ReminderDTO reminderDTO) {
        return reminderService.createReminder(reminderDTO);
    }

    @GetMapping("/sendsms/{remid}")
    public String SendSms(@PathVariable("remid") String remId) {
        eventModel event = eventclient.getEvent(reminderRepository.findById(remId).get().getEventId());
        User user = userclient.getResidentById(reminderRepository.findById(remId).get().getUserId());
        String message = "we have an "+ event.getEventTitle() +" event on " + reminderService.formatDateTime(event.getEventDate());
        return reminderService.SendSms(user.getPhoneNumber(), message);
    }

    @GetMapping("/sendcall/{remid}")
    public String SendCall(@PathVariable("remid") String remId) {
        eventModel event = eventclient.getEvent(reminderRepository.findById(remId).get().getEventId());
        User user = userclient.getResidentById(reminderRepository.findById(remId).get().getUserId());
        String message = "we have an "+ event.getEventTitle() +" event on " + reminderService.formatDateTime(event.getEventDate());
        return reminderService.SendCall(user.getPhoneNumber(), message);
    }

//    @GetMapping("/sendemail/{remid}")
//    public String SendEmail(@PathVariable("remid") String remId) {
//        eventModel event = eventclient.getEvent(reminderRepository.findById(remId).get().getEventId());
//        User user = userclient.getResidentById(reminderRepository.findById(remId).get().getUserId());
//        String message = "we have an "+ event.getEventTitle() +" event on " + reminderService.formatDateTime(event.getEventDate());
//        return reminderService.SendEmail(user.getEmail(), message);
//    }

    @GetMapping("/sendUrgentsmsAndCall")
    public String SendUrgentSmsAndCall(@RequestBody Urgentdto dto) {
        reminderService.SendSms(dto.getPhoneNumber(), dto.getMessage());
        reminderService.SendCall(dto.getPhoneNumber(), dto.getMessage());
        return "you may receive a message and call now!!!";
    }

}
