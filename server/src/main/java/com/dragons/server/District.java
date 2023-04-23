package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
  
@Document
public class District {
    @Id
    private int number;

    private String incumbent;
    private String loser;
    private String winner;

    private String loseParty;
    private String winParty;

    private String demographicGraph;
    private String detailChangeTable;
        
    public int getNumber(){
        return number;
    }
}
