package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

  
@Document("state")
public class State {

    @Id
    private String name;

    private String geoJSON;

    private DistrictPlan[] plans;
    
    private Ensemble ensemble;

    public String getName(){
        return name;
    }

    public String getBorders(){
        return geoJSON;
    }

    public void setBorders(String geoJSON){
        this.geoJSON=geoJSON;
    }

    public DistrictPlan[] getPlans(){
        return plans;
    }

    public void setPlans(DistrictPlan[] obj){
        this.plans=obj;
    }

    public DistrictPlan getPlan(String name){
        for (DistrictPlan plan : plans){
            if (plan.getName().equals(name)){ return plan;}
        }
        return null;
    }

    public Ensemble getEnsemble(){
        return ensemble;
    }

    public void setEnsemble(Ensemble obj){
        this.ensemble=obj;
    }
}
