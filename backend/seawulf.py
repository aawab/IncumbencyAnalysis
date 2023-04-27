import matplotlib.pyplot as plt
from gerrychain import (GeographicPartition, Partition, Graph, MarkovChain,
                        proposals, updaters, constraints, accept, Election)
from gerrychain.proposals import recom
from functools import partial
import pandas
import geopandas as gp
def gen_initial_partition(state):
    
    graph = Graph.from_file(f"./preprocessing/{state}precincts.geojson")
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
                   epsilon=0.02,
                   node_repeats=2
                )
    
    compactness_bound = constraints.UpperBound(
        lambda p: len(p["cut_edges"]),
        2*len(initial_partition["cut_edges"])
    )

    pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, 0.07)
    
    chain = MarkovChain(
        proposal=proposal,
        constraints=[
            compactness_bound
        ],
        accept=accept.always_accept,
        initial_state=initial_partition,
        total_steps=30
    )
    
    for partition in chain:
        data = pandas.DataFrame(
             sorted(partition["PRES20"].percents("Democratic"))
        )   
        print(partition)

def main():
    gen_initial_partition('az')
    
if __name__ == "__main__":
    main()