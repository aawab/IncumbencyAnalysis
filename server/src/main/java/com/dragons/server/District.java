package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
  
@Document
public class District {
    @Id
    private int number;

    private String incumbent;
    private String[] candidates;
    private String[] party;
    private String winner;

    public int getNumber(){
        return number;
    }

}
