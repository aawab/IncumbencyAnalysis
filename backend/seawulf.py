import matplotlib.pyplot as plt
from gerrychain import (GeographicPartition, Partition, Graph, MarkovChain,
                        proposals, updaters, constraints, accept, Election)
from gerrychain.proposals import recom
from functools import partial
import pandas
import geopandas as gp
def gen_initial_partition(state):
    
    df = gp.read_file("./preprocessing/azprecincts.json")
    df['geometry'] = df['geometry'].buffer(0.001)
    graph = Graph.from_geodataframe(df)
    
    graph.to_json("state.json")
    graph = Graph.from_json("state.json")
    elections = [
        Election("PRES20", {"Democratic": "adv_20", "Republican": "arv_20"})
    ]
    # elections = [
    #     Election("PRES20", {"Republican": "G20PRERTRU", "Democrat": "G20PREDBID"})
    # ]
    
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

    pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, 0.07)
    
    chain = MarkovChain(
        proposal=proposal,
        constraints=[
            
        ],
        accept=accept.always_accept,
        initial_state=initial_partition,
        total_steps=30
    )
    i = 0
    for partition in chain:
        i+=1
        print(i)
def main():
    gen_initial_partition('az')
    
if __name__ == "__main__":
    main()