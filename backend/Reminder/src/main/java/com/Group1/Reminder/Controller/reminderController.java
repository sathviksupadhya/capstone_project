package com.Group1.Reminder.Controller;

import com.Group1.Reminder.dto.*;
import com.Group1.Reminder.feign.eventClient;
import com.Group1.Reminder.feign.userClient;
import com.Group1.Reminder.model.Reminder;
import com.Group1.Reminder.repository.ReminderRepository;
import com.Group1.Reminder.service.ReminderService;
import com.netflix.discovery.converters.Auto;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.type.PhoneNumber;
import com.twilio.type.Twiml;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

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
        Reminder r = reminderRepository.findById(remId).get();
        r.setNeedSms(false);
        reminderRepository.save(r);
        return reminderService.SendSms(user.getPhoneNumber(), message);
    }

    @GetMapping("/sendcall/{remid}")
    public String SendCall(@PathVariable("remid") String remId) {
        eventModel event = eventclient.getEvent(reminderRepository.findById(remId).get().getEventId());
        User user = userclient.getResidentById(reminderRepository.findById(remId).get().getUserId());
        String message = "we have an "+ event.getEventTitle() +" event on " + reminderService.formatDateTime(event.getEventDate());
        Reminder r = reminderRepository.findById(remId).get();
        r.setNeedCall(false);
        reminderRepository.save(r);
        return reminderService.SendCall(user.getPhoneNumber(), message);
    }

//    @GetMapping("/sendemail/{remid}")
//    public String SendEmail(@PathVariable("remid") String remId) {
//        eventModel event = eventclient.getEvent(reminderRepository.findById(remId).get().getEventId());
//        User user = userclient.getResidentById(reminderRepository.findById(remId).get().getUserId());
//        String message = "we have an "+ event.getEventTitle() +" event on " + reminderService.formatDateTime(event.getEventDate());
//        return reminderService.SendEmail(user.getEmail(), message);
//    }
    @GetMapping("/getbyUserId/{userId}")
    public List<Reminder> getReminderByUserId(@PathVariable("userId") String userId) {
        return reminderService.getReminderByUserId(userId);
    }

    @Scheduled(fixedRate = 60000)
    @GetMapping("/call")
    public void Call() {
       reminderRepository.findAll().forEach(reminder -> {
           eventModel event = eventclient.getEvent(reminder.getEventId());
           LocalDateTime eventDate = event.getEventDate();
           LocalDateTime currentTime = LocalDateTime.now();
           if (ChronoUnit.MINUTES.between(currentTime, eventDate) == 30) {
               User user = userclient.getResidentById(reminder.getUserId());
               String message = "we have an " + event.getEventTitle() + " event on " + reminderService.formatDateTime(event.getEventDate());
               if (reminder.isNeedCall()) {
                   Reminder r = reminderRepository.findById(reminder.getRemId()).get();
                   r.setNeedCall(false);
                   reminderRepository.save(r);
                   reminderService.SendCall(user.getPhoneNumber(), message);
               }
               if (reminder.isNeedSms()) {
                   Reminder r = reminderRepository.findById(reminder.getRemId()).get();
                   r.setNeedSms(false);
                   reminderRepository.save(r);
                   reminderService.SendCall(user.getPhoneNumber(), message);
               }
           }
       });
    }

    @GetMapping("/sendUrgentsmsAndCall")
    public String SendUrgentSmsAndCall(@RequestBody Urgentdto dto) {
        reminderService.SendSms(dto.getPhoneNumber(), dto.getMessage());
        reminderService.SendCall(dto.getPhoneNumber(), dto.getMessage());
        return "you may receive a message and call now!!!";
    }

}
