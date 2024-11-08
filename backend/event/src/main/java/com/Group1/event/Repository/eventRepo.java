package com.Group1.event.Repository;

import com.Group1.event.Model.eventModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface eventRepo extends MongoRepository<eventModel, String>{
}
