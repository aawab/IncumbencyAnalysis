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
        "population": updaters.Tally("vap"), 
        "pop_white": updaters.Tally("vap_white"), 
        "pop_hisp": updaters.Tally("vap_hisp"), 
        "pop_black": updaters.Tally("vap_black"),
        "pop_aian": updaters.Tally("vap_aian"),
        "pop_asian": updaters.Tally("vap_asian"),
        "pop_nhpi": updaters.Tally("vap_nhpi"),
        "pop_other": updaters.Tally("vap_other"),
        "pop_two": updaters.Tally("vap_two")
    }
    
    election_updaters = {election.name: election for election in elections}
    my_updaters.update(election_updaters)
    
    initial_partition = GeographicPartition(graph, assignment="district_num", updaters=my_updaters)
    print(initial_partition["population"])
    ideal_population = sum(initial_partition["population"].values()) / len(initial_partition)

    proposal = partial(
                   recom,
                   pop_col="vap",
                   pop_target=ideal_population,
                   epsilon=0.05,
                   node_repeats=20
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
        # wh_votes = list(partition['pop_white'].values())
        # his_votes = list(partition['pop_hisp'].values())
        # blc_votes = list(partition['pop_black'].values())
        district_order = list(partition.parts.keys())
    
    print(partition.graph.nodes[0])

    geometry = list()
    for district, subgraph in partition.subgraphs.items():
        distGeo = gpd.GeoDataFrame(columns=['district', 'node', 'geometry'])
        i = 0
        for node in subgraph.nodes:
            distGeo.loc[i] = [district, node, partition.graph.nodes[node]['geometry']]
            i += 1
        
        dissolved = distGeo.dissolve(by='district')
        geometry.append(dissolved.iloc[0]['geometry'])

    finalPlan = gpd.GeoDataFrame({
        'DISTRICT':int(district),
        # 'vap_white':wh_votes[int(district)-1],
        # 'vap_hisp':his_votes[int(district)-1],
        # 'vap_black':blc_votes[int(district)-1],
        'geometry':geometry[int(district)-1]
    } for district, subgraphs in partition.subgraphs.items()
    )


    finalPlan.to_file("az_test.json", driver="GeoJSON")
    
def main():
    gen_initial_partition('az')
    
if __name__ == "__main__":
    main()