package com.Group1.Reminder.Controller;

import com.Group1.Reminder.dto.ReminderDTO;
import com.Group1.Reminder.dto.Response;
import com.Group1.Reminder.service.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reminder")
public class reminderController {

    @Autowired
    private ReminderService reminderService;

    @PostMapping("/create")
    public Response<ReminderDTO> createReminder(@RequestBody ReminderDTO reminderDTO) {
        return reminderService.createReminder(reminderDTO);
    }

    @GetMapping("/sendsms/{remid}/{userid}")
    public String SendSms(@PathVariable("remid") String remId, @PathVariable("userid") String userId) {
        return reminderService.SendSms(remId);
    }

    @GetMapping("/sendcall/{remid}/{userid}")
    public String SendCall(@PathVariable("remid") String remId, @PathVariable("userid") String userId) {
        return reminderService.SendCall(remId);
    }

}
