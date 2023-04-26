import json
import math
import geopandas as ge
import pandas as pd

States = {
    'Arizona' : {
        "Abbr" : "AZ",
        "2020 Precinct Boundary" : "files/PrecinctBoundaries/Arizona2020PREC.geojson",
        "2020 Precinct Demographics" : "files/PrecinctDemographics/ArizonaVTDs.csv",
        "Approved District Plan" : "files/ApprovedDistrictPlans/ArizonaApproved.geojson",
        "Neighbor File" : "files/PrecinctNeighbors/Arizona2020Neighbors.csv"
        },
    'Colorado' : {
        "Abbr" : "CO",
        "2020 Precinct Boundary" : "files/PrecinctBoundaries/co2020PREC.geojson",
        "2020 Precinct Demographics" : "files/PrecinctDemographics/coVTDs.csv",
        "Approved District Plan" : "files/ApprovedDistrictPlans/ColoradoApproved.geojson",
        "Neighbor File" : "files/PrecinctNeighbors/Colorado2020Neighbors.csv"
    },
    'Ohio' : {
        "Abbr" : "OH",
        "2020 Precinct Boundary" : "files/PrecinctBoundaries/Ohio2020PREC.geojson",
        "2020 Precinct Demographics" : "files/PrecinctDemographics/OhioVTDs.csv",
        "Approved District Plan" : "files/ApprovedDistrictPlans/OhioApproved.geojson",
        "Neighbor File" : "files/PrecinctNeighbors/Ohio2020Neighbors.csv"
    }
}
def main():
    
    #merged = mergeData(States["Arizona"])
    #merged = reformatter(merged)
    #writePrecObjectToFile(States["Arizona"], merged)

    merged = mergeData(States["Colorado"])
    #merged = reformatter(merged)
    writePrecObjectToFile(States["Colorado"], merged)

    #merged = mergeData(States["Ohio"])
    #merged = reformatter(merged)
    #writePrecObjectToFile(States["Ohio"], merged)

    #writePrecNeighborsToFile(States["Arizona"])
    #writePrecNeighborsToFile(States["Colorado"])
    #writePrecNeighborsToFile(States["Ohio"])

def mergeData(state):
    precBound = ge.read_file(state["2020 Precinct Boundary"])
    precDemo = ge.read_file(state["2020 Precinct Demographics"])
    precBound = ge.GeoDataFrame(precBound, columns=['GEOID20', 'VTDST20', 'geometry'])
    precDemo = ge.GeoDataFrame(precDemo, columns=['GEOID20', 'vap','vap_hisp','vap_white','vap_black','vap_aian','vap_asian','vap_nhpi','vap_other','vap_two', 'arv_20','adv_20'])
    merged = ge.GeoDataFrame(pd.merge(precBound, precDemo))
    return merged

def reformatter(dataframe):
    dataframe.rename(columns={"ADJ_GEOMS" : "neighbors"}, inplace=True)
    return dataframe

def writePrecObjectToFile(state, dataframe):
    dataframe.to_file("SeaWulfFiles/PrecinctObjects/" + state["Abbr"] + "2020.geojson", driver="GeoJSON")

def writePrecNeighborsToFile(state):
    neighbordf = pd.read_csv(state["Neighbor File"])
    neighbordf = reformatter(neighbordf)
    neighbordf.to_json("SeaWulfFiles/PrecinctNeighbors/" + state["Abbr"] + "2020.json", orient='records', indent=4)

if __name__ == '__main__':
    main()