# from gerrychain.random import random as grand
# from random import random
# grand.seed(2018)
import matplotlib.pyplot as plt
from gerrychain import (GeographicPartition, Partition, Graph, MarkovChain,
                        proposals, updaters, constraints, accept, Election)
from gerrychain.proposals import recom
from functools import partial
import pandas
import geopandas as gpd
def gen_initial_partition(state):
    
    df = gpd.read_file("./preprocessing/azprecincts.json")
    df['geometry'] = df['geometry'].buffer(0.001)
    graph = Graph.from_geodataframe(df)
   
    #graph.to_json("state.json")
    #graph = Graph.from_json("state.json")
    elections = [
        Election("PRES20", {"Democratic": "adv_20", "Republican": "arv_20"})
    ]
    
    my_updaters = {
        "population": updaters.Tally("vap", alias="population"), 
        "pop_white": updaters.Tally("vap_white", alias="pop_white"), 
        "pop_hisp": updaters.Tally("vap_hisp", alias="pop_hisp"), 
        "pop_black": updaters.Tally("vap_black", alias="pop_black"),
        "pop_asian": updaters.Tally("vap_asian", alias="pop_asian"),
    }
    
    election_updaters = {election.name: election for election in elections}
    my_updaters.update(election_updaters)
    
    initial_partition = GeographicPartition(graph, assignment="district_num", updaters=my_updaters)
    ideal_population = sum(initial_partition["population"].values()) / len(initial_partition)

    proposal = partial(
                   recom,
                   pop_col="vap",
                   pop_target=ideal_population,
                   epsilon=0.2,
                   node_repeats=2
                )
    
    compactness_bound = constraints.UpperBound(
        lambda p: len(p["cut_edges"]),
        2*len(initial_partition["cut_edges"])
    )

    pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, 1)
    
    chain = MarkovChain(
        proposal=proposal,
        constraints=[
            #pop_constraint,
            compactness_bound
        ],
        accept=accept.always_accept,
        initial_state=initial_partition,
        total_steps=100
    )

    for partition in chain.with_progress_bar():
        pop = list(partition['population'].values())
        wh_votes = list(partition['pop_white'].values())
        his_votes = list(partition['pop_hisp'].values())
        blc_votes = list(partition['pop_black'].values())
        asian_votes = list(partition['pop_asian'].values())
        district_order = list(partition.parts.keys())

    geometry = list()
    generated_precincts = []
    for district, subgraph in partition.subgraphs.items():
        distGeo = gpd.GeoDataFrame(columns=['district', 'node', 'vap', 'vap_white', 'vap_hisp', 'vap_black', 'vap_asian', 'geometry'])
        i = 0
        for node in subgraph.nodes:
            distGeo.loc[i] = [
                district, node, 
                partition.graph.nodes[node]['vap'], 
                partition.graph.nodes[node]['vap_white'], 
                partition.graph.nodes[node]['vap_hisp'], partition.graph.nodes[node]['vap_black'], 
                partition.graph.nodes[node]['vap_asian'],
                partition.graph.nodes[node]['geometry']
            ]
            i += 1
        
        dissolved = distGeo.dissolve(by='district')
        geometry.append(dissolved.iloc[0]['geometry'])
        generated_precincts = distGeo

    generated_precincts.to_file("what.json", driver="GeoJSON")

    finalPlan = gpd.GeoDataFrame( {
        'DISTRICT':int(district),
        'vap':pop[int(district-1)],
        'vap_white':wh_votes[int(district)-1],
        'vap_hisp':his_votes[int(district)-1],
        'vap_black':blc_votes[int(district)-1],
        'vap_asian': asian_votes[int(district)-1],
        'geo_area': geometry[int(district)-1].area,
        'geometry':geometry[int(district)-1]
    } for district, _ in partition.subgraphs.items()
    )

    finalPlan.crs = "EPSG:3857"
    finalPlan.to_file("az_test.json", driver="GeoJSON")
    #print(finalPlan['geometry'].area)
    print(calc_var(initial_partition, partition))
    df = df.dissolve(by='district_num')
    
    #print(df['geometry'].area)

    
def main():
    gen_initial_partition('az')
    
    
def calc_var(initial_partition, new_partition):
        var = {'popVar': [],'whVar': [],'hisVar': [],'blcVar': [],'asianVar': [],'areaVar': []}
        for district in initial_partition.assignment.parts.keys():
            b = new_partition.assignment.parts[district] - initial_partition.assignment.parts[district]
            gb = new_partition.assignment.parts[district].union(initial_partition.assignment.parts[district])
            graph = initial_partition.graph
            sum_gb = {'population':0,  'wh_votes':0, 'his_votes':0, 'blc_votes':0, 'asian_votes':0, 'area':0}
            for node in gb:
                sum_gb['population'] += graph.nodes[node]['vap']
                sum_gb['wh_votes'] += graph.nodes[node]['vap_white']
                sum_gb['his_votes'] += graph.nodes[node]['vap_hisp']
                sum_gb['blc_votes'] += graph.nodes[node]['vap_black']
                sum_gb['asian_votes'] += graph.nodes[node]['vap_asian']
                sum_gb['area'] += graph.nodes[node]['geo_area']
            sum_b={'population':0,  'wh_votes':0, 'his_votes':0, 'blc_votes':0, 'asian_votes':0, 'area':0}
            for node in b:
                sum_b['population'] += graph.nodes[node]['vap']
                sum_b['wh_votes'] += graph.nodes[node]['vap_white']
                sum_b['his_votes'] += graph.nodes[node]['vap_hisp']
                sum_b['blc_votes'] += graph.nodes[node]['vap_black']
                sum_b['asian_votes'] += graph.nodes[node]['vap_asian']
                sum_b['area'] += graph.nodes[node]['geo_area']
            var['popVar'].append(round(sum_b['population']/sum_gb['population'],3))
            var['whVar'].append(round(sum_b['wh_votes']/sum_gb['wh_votes'],3))
            var['hisVar'].append(round(sum_b['his_votes']/sum_gb['his_votes'],3))
            var['blcVar'].append(round(sum_b['blc_votes']/sum_gb['blc_votes'],3))
            var['asianVar'].append(round(sum_b['asian_votes']/sum_gb['asian_votes'],3))
            var['areaVar'].append(round(sum_b['area']/sum_gb['area'],3))
        return var
if __name__ == "__main__":
    main()