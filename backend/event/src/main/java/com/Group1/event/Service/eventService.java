package com.Group1.event.Service;

import com.Group1.event.Model.eventModel;
import com.Group1.event.Repository.eventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class eventService {

    @Autowired
    private eventRepo repo;


    public eventModel addEvent(eventModel event) {
        return repo.save(event);
    }

    public List<eventModel> getAllEvents() {
        return repo.findAll();
    }

    public eventModel update(String eventId, eventModel event) {
        eventModel existingEvent = repo.findById(eventId).orElse(null);
        if (existingEvent != null) {
            existingEvent.setEventTitle(event.getEventTitle());
            existingEvent.setEventDescription(event.getEventDescription());
            existingEvent.setEventDate(event.getEventDate());
            existingEvent.setEventImg(event.getEventImg());
            existingEvent.setEventType(event.getEventType());
            return repo.save(existingEvent);
        } else {
            return null;
        }
    }

    public void deleteEvent(String eventId) {
        if (repo.existsById(eventId)) {
            repo.deleteById(eventId);
        }
    }

    public eventModel getEvent(String eventId) {
        return repo.findById(eventId).orElse(null);
    }
}
