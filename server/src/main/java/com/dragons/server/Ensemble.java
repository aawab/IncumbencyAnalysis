package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
  
@Document
public class Ensemble {
    @Id
    private String name;


    public String getName(){
        return name;
    }

}
