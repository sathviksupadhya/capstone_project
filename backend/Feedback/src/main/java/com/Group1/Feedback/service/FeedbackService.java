package com.Group1.Feedback.service;

import com.Group1.Feedback.dto.FeedbackDto;
import com.Group1.Feedback.model.Feedback;
import com.Group1.Feedback.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public static FeedbackDto entityToDto(Feedback feedback) {
        FeedbackDto dto = new FeedbackDto();
        dto.setFeedbackId(feedback.getFeedbackId());
        dto.setFeedbackText(feedback.getFeedbackText());
        dto.setEventId(feedback.getEventId());
        dto.setUserId(feedback.getUserId());
        dto.setUserName(feedback.getUserName());
        return dto;
    }
    public static Feedback dtoToEntity(FeedbackDto dto) {
        Feedback feedback = new Feedback();
        feedback.setFeedbackId(dto.getFeedbackId());
        feedback.setFeedbackText(dto.getFeedbackText());
        feedback.setEventId(dto.getEventId());
        feedback.setUserId(dto.getUserId());
        feedback.setUserName(dto.getUserName());
        return feedback;
    }

    public FeedbackDto addFeedback(FeedbackDto feedbackDTO) {
        Feedback feedback = FeedbackService.dtoToEntity(feedbackDTO); // Convert DTO to entity
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return FeedbackService.entityToDto(savedFeedback); // Convert saved entity to DTO
    }


    // Get all feedbacks
    public List<FeedbackDto> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackRepository.findAll();
        return feedbacks.stream().map(FeedbackService::entityToDto).collect(Collectors.toList());
    }



    // Get feedbacks by event ID
//    public List<FeedbackDto> getFeedbacksByEventId(Long eventId) {
//        Event event = eventRepository.findById(eventId)
//                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + eventId));
//
//        List<Feedback> feedbacks = feedbackRepository.findByEvent(event);
//
//        return feedbacks.stream().map(this::entityToDto).collect(Collectors.toList());
//    }




    public void deleteFeedback(int feedbackId) {
        feedbackRepository.deleteById(feedbackId);
    }

    public FeedbackDto updateFeedback(int feedbackId, FeedbackDto feedbackDto) {
        Feedback feedback = feedbackRepository.findById(feedbackId).orElse(null);
        if (feedback == null) {
            throw new RuntimeException("Feedback not found with id: " + feedbackId);
        }
        feedback.setFeedbackText(feedbackDto.getFeedbackText());
        return entityToDto(feedbackRepository.save(feedback));
    }

    public List<FeedbackDto> getFeedbackByEventId(int eventId) {
        List<Feedback> feedbacks = feedbackRepository.findByEventId(eventId);
        return feedbacks.stream().map(FeedbackService::entityToDto).collect(Collectors.toList());
    }

    public List<FeedbackDto> getFeedbackByUserId(int userId) {
        List<Feedback> feedbacks = feedbackRepository.findByUserId(userId);
        return feedbacks.stream().map(FeedbackService::entityToDto).collect(Collectors.toList());
    }

    public FeedbackDto getFeedbackByEventIdAndUserId(int eventId, int userId) {
        Feedback feedback = feedbackRepository.findByEventIdAndUserId(eventId, userId);
        return feedback == null? null : entityToDto(feedback);
    }
}
