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
        dto.setFeedbackMessage(feedback.getFeedbackMessage());
        dto.setEventId(feedback.getEventId());
        dto.setUserId(feedback.getUserId());
        return dto;
    }
    public static Feedback dtoToEntity(FeedbackDto dto) {
        Feedback feedback = new Feedback();
        feedback.setFeedbackId(dto.getFeedbackId());
        feedback.setFeedbackMessage(dto.getFeedbackMessage());
        feedback.setEventId(dto.getEventId());
        feedback.setUserId(dto.getUserId());
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




    public void deleteFeedback(String feedbackId) {
        feedbackRepository.deleteById(feedbackId);
    }

    public FeedbackDto updateFeedback(String feedbackId, FeedbackDto feedbackDto) {
        Feedback feedback = feedbackRepository.findById(feedbackId).orElse(null);
        if (feedback == null) {
            throw new RuntimeException("Feedback not found with id: " + feedbackId);
        }
        feedback.setFeedbackMessage(feedbackDto.getFeedbackMessage());
        return entityToDto(feedbackRepository.save(feedback));
    }

    public List<FeedbackDto> getFeedbackByEventId(String eventId) {
        List<Feedback> feedbacks = feedbackRepository.findByEventId(eventId);
        return feedbacks.stream().map(FeedbackService::entityToDto).collect(Collectors.toList());
    }

    public List<FeedbackDto> getFeedbackByUserId(String userId) {
        List<Feedback> feedbacks = feedbackRepository.findByUserId(userId);
        return feedbacks.stream().map(FeedbackService::entityToDto).collect(Collectors.toList());
    }

    public FeedbackDto getFeedbackByEventIdAndUserId(String eventId, String userId) {
        Feedback feedback = feedbackRepository.findByEventIdAndUserId(eventId, userId);
        return feedback == null? null : entityToDto(feedback);
    }
}
