package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
  
@Document
@Data
public class Candidate {

    private String name;
    private String party;

}

