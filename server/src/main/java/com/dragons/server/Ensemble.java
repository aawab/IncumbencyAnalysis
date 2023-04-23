package com.dragons.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
  
@Document
public class Ensemble {

    private int numDistrictPlans;
    private int numIncumbents;
    private int numIncumbentsPredictedToWin;
    private int avgGeoVar;
    private int avgPopVar;

    private String geoVarGraph;
    private String popVarGraph;
    private String raceVarGraph;
    private String ageVarGraph;
    private String repDemSplitData;

}
