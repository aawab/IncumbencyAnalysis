package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
  
@Document("state")
@Data
public class State {

    @Id
    private String name;

    private Object geoJSON;

    private DistrictPlan[] plans;
    
    private Ensemble ensemble;

    public DistrictPlan getPlan(String name){
        for (DistrictPlan plan : plans){
            if (plan.getName().equals(name)){ return plan;}
        }
        return null;
    }
}
