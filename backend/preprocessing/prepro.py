import geopandas as gpd
from numpy import int64
import pandas as pd

from collections import defaultdict

def main():
    preprop_state('az')
    preprop_state('oh')
    preprop_state('co')

def preprop_state(state):
    precincts = gpd.read_file(f'./files/PrecinctShapefiles/{state}_vtd_2020_bound/{state}_vtd_2020_bound.shp') 
    precincts = precincts.to_crs(3857)
    districts2020 = gpd.read_file(f'./files/congressionaldistricts/2020/{state}districts.json')
    districts2022 = gpd.read_file(f'./files/congressionaldistricts/2022/{state}districts.json')
    precinct_info = gpd.read_file(f'./files/PrecinctDemographics/{state}VTDs.csv')
    districts2020 = districts2020.to_crs(3857)
    districts2022 = districts2022.to_crs(3857)
    # store each district's precincts in a separate set
    sep_dist2020 = separate_districts(precincts, districts2020) 
    sep_dist2022 = separate_districts(precincts, districts2022) 

    precincts = add_pop_data(precinct_info, precincts) 
    
    for district in range(len(sep_dist2020)):
        for precinct in sep_dist2020[district]:
            precincts.loc[precincts["VTDST20"] == precinct, 'district_num'] = district + 1

    precincts['district_num'] = precincts['district_num'].astype(int)
    for _, row in precincts.iterrows():
        precincts.loc[precincts["VTDST20"] == row["VTDST20"], 'geo_area'] = row['geometry'].area
        
    district_to_incumbent = {}
    # Incumbent to district data found at https://www.270towin.com/2020-house-election/states/
    if state == 'az':
        district_to_incumbent = {
            1: "Tom O'Hallrean", 2: "Ann Kirkpatrick", 
            3: "Raul Grijalva",  4: "Paul Gosar", 
            5: "Andy Biggs",     6: "David Schweikert",
            7: "Ruben Gallego",  8: "Debbie Lesko",
            9: "Greg Stanton"
        }
    elif state == 'oh':
        district_to_incumbent = {
            1: "Steve Chabot",    2: "Brad Wenstrup",
            3: "Joyce Beatty",    4: "Jim Jordan",
            5: "Robert Latta",    6: "Bill Johnson",
            7: "Bob Gibbs",       8: "Warren Davidson",
            9: "Marcy Kaptur",   10: "Michael Turner",
            11: "Marcia Fudge",  12: "Troy Balderson",
            13: "Tim Ryan",      14: "David Joyce",
            15: "Steve Stivers", 16: "Anthony Gonzalez"
        }
    elif state == 'co':
        district_to_incumbent = {
            1: "Diana DeGette",  2: "Joe Neguse",
            3: "Lauren Boebert", 4: "Ken Buck",
            5: "Doug Lamborn",   6: "Jason Crow",
            7: "Ed Perlmutter"
        }
        
    precincts['Incumbent'] = precincts['district_num'].map(district_to_incumbent)
    precincts.to_file(f"{state}precincts.json", driver="GeoJSON")

def separate_districts(precincts, districts):
    separated = [set() for _ in range(districts.shape[0])] 
    intersections = districts.overlay(precincts, how='intersection')
    intersections = intersections.astype({'DISTRICT': 'int'})
    for i in range(intersections.shape[0]):
        separated[intersections["DISTRICT"][i] - 1].add(intersections["VTDST20"][i])

    '''
    Compare each precinct with every other precinct. Check for overlapping boundaries. Keep the one with the larger area.
    '''
    
    for i in range(len(separated)):
        for j in range(len(separated)):
            if i != j:
                for vtdsts in separated[i].intersection(separated[j]):
                    district_i = (intersections["DISTRICT"] == i + 1)
                    vtdst = (intersections["VTDST20"] == vtdsts)
                    iValue = intersections[district_i & vtdst]['geometry'].area.values[0]
                    
                    district_j = (intersections["DISTRICT"] == j + 1)
                    jValue = intersections[district_j & vtdst]['geometry'].area.values[0]

                    if iValue < jValue:
                        separated[i].remove(vtdsts)
                    else:
                        separated[j].remove(vtdsts)        

    return separated

def add_pop_data(precinctinfo, precincts):
    cols = ['vap','vap_hisp','vap_white','vap_black','vap_aian','vap_asian','vap_nhpi', 'vap_other', 'vap_two','arv_20','adv_20']
    precinctinfo = gpd.GeoDataFrame(precinctinfo, columns=['GEOID20'] + cols)
    precinctinfo[cols] = precinctinfo[cols].apply(pd.to_numeric)
    precincts = gpd.GeoDataFrame(pd.merge(precincts, precinctinfo))
    return precincts

'''
This function is not used as data was found at https://redistrictingdatahub.org/data/download-data/.
Neighbor files stored in ./files/PrecinctNeighbors/
'''
def calculate_neighbors(df):
    bufferedDF = df.copy()
    bufferedDF['geometry'] = bufferedDF['geometry'].buffer(60.96) # 200 ft = 60.96 m

    intersections = df.overlay(bufferedDF, how='intersection')
    neighbors = defaultdict(set)
    for i in range(intersections.shape[0]):
        if intersections['VTDST20_1'][i] != intersections['VTDST20_2'][i]: # avoid adding a precinct as its own neighbor
            neighbors[intersections['VTDST20_1'][i]].add(intersections['VTDST20_2'][i])
    
    arr = []
    for i in range(df.shape[0]):
       arr.append(','.join(neighbors[df['VTDST20'][i]]))
    
    return arr

if __name__ == "__main__":
    main()