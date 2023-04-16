package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

  
@Document(collection = "state")
public class State {
    @Id
    private String name;

    private String geoJSON;
    // private HashTable<String,DistrictPlan> plans;
    private Ensemble ensemble;

    public String getName(){
        return name;
    }

    public String getBorders(){
        return geoJSON;
    }

    // public HashTable<String, DistrictPlan> getPlans(){
    //     return plans;
    // }

    // public DistrictPlan getPlan(String name){
    //     return plans.get(name);
    // }

    public Ensemble getEnsemble(){
        return ensemble;
    }
}
