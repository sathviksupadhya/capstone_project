package com.Group1.Reminder.repository;

import com.Group1.Reminder.model.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReminderRepository extends JpaRepository<Reminder,Integer> {
}
