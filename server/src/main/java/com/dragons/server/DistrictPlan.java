package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
  
@Document
@Data
public class DistrictPlan {
    private String name;

    private Object geoJSON;
    private District[] districts;

    private int numIncumbents;
    private int incumbentDistrictVariation;
    
    private Object incumbentTable;
    private Object safeSeatGraph;
}
