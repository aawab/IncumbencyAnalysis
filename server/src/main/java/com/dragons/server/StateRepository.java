package com.dragons.server;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface StateRepository extends MongoRepository<State,String>{
    
}