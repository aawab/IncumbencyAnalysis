package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
  
@Document
public class DistrictPlan {
    @Id
    private String name;

    private String geoJSON;
    private District[] districts;

    public String getName(){
        return name;
    }

}
