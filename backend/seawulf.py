import matplotlib.pyplot as plt
from gerrychain import (GeographicPartition, Partition, Graph, MarkovChain,
                        proposals, updaters, constraints, accept, Election)
from gerrychain.proposals import recom
from functools import partial
import pandas

def gen_initial_partition(state):
    graph = Graph.from_file(f"./preprocessing/{state}precincts.json")
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
        total_steps=10
    )
    
    for partition in chain:
        data = pandas.DataFrame(
            sorted(partition["PRES20"].percents("Democratic"))
        )   
        print(data)
    print(partition['exterior_boundaries'])
    #a = partition["geometries"]
    fig, ax = plt.subplots(figsize=(8, 6))

    # Draw 50% line
    ax.axhline(0.5, color="#cccccc")

    # Draw boxplot
    data.boxplot(ax=ax, positions=range(len(data.columns)))

    # Draw initial plan's Democratic vote %s (.iloc[0] gives the first row)
    plt.plot(data.iloc[0], "ro")

    # Annotate
    ax.set_title("Comparing the 2011 plan to an ensemble")
    ax.set_ylabel("Democratic vote % (Senate 2012)")
    ax.set_xlabel("Sorted districts")
    ax.set_ylim(0, 1)
    ax.set_yticks([0, 0.25, 0.5, 0.75, 1])

    plt.show()

def main():
    gen_initial_partition('az')
    
if __name__ == "__main__":
    main()