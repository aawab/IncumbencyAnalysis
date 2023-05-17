package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
  
@Document
@Data
public class District {
    private int number;

    private Object incumbent;
    private Object winner;
    private Object loser;

    private Object demographicGraph;
    private Object detailChangeTable;
}
