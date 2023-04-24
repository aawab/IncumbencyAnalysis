package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
  
@Document
public class DistrictPlan {
    private String name;

    private String geoJSON;
    private District[] districts;

    private int numIncumbents;
    
    private String incumbentTable;
    private String safeSeatGraph;

    public String getName(){
        return name;
    }

}
