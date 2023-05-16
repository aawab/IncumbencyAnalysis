package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
  
@Document
@Data
public class Ensemble {

    private int numDistrictPlans;
    private int numIncumbents;
    private int numIncumbentsPredictedToWin;
    private int avgGeoVar;
    private int avgPopVar;

    private Object geoVarGraph;
    private Object popVarGraph;
    private Object whiteVarGraph;
    private Object blackVarGraph;
    private Object asianVarGraph;
    private Object hispanicVarGraph;
    private Object ageVarGraph;
    private Object incomeVarGraph;
    private Object repDemSplitData;

}
