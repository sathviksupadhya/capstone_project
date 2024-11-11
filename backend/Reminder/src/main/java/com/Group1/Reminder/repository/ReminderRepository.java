package com.Group1.Reminder.repository;

import com.Group1.Reminder.model.Reminder;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReminderRepository extends MongoRepository<Reminder,String> {
}
