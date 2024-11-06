package com.Group1.Feedback.repository;

import com.Group1.Feedback.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback,Integer> {
    List<Feedback> findByEventId(int eventId);

    List<Feedback> findByUserId(int userId);

    Feedback findByEventIdAndUserId(int eventId, int userId);
//    List<Feedback> findByEventId(Long eventId);
//
//    List<Feedback> findByUserId(Long userId);
}
