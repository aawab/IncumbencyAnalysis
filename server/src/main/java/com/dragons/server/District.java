package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
  
@Document
@Data
public class District {
    private int number;

    private Candidate incumbent;
    private Candidate winner;
    private Candidate loser;

    private String demographicGraph;
    private String detailChangeTable;
}
