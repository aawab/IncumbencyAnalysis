from ast import literal_eval
import numpy as np
current_district = 0
file = open('box_and_whiskeroh.txt', 'r')
lines = file.readlines()

popVar = []
whVar = []
hisVar = []
blcVar = []
asianVar = []
areaVar = []

boxpop = []
boxwh = []
boxhis = []
boxblc = []
boxasian = []
boxarea = []
for i in range(16):
    for line in lines:
        curr = line.split(" ", 1)
        if len(curr) == 2:
            if curr[0] == "popVar":
                popVar.append(literal_eval(curr[1])[i])
            if curr[0] == "whVar":
                whVar.append(literal_eval(curr[1])[i])
            if curr[0] == "hisVar":
                hisVar.append(literal_eval(curr[1])[i])
            if curr[0] == "blcVar":
                blcVar.append(literal_eval(curr[1])[i])
            if curr[0] == "asianVar":
                asianVar.append(literal_eval(curr[1])[i])
            if curr[0] == "areaVar":
                areaVar.append(literal_eval(curr[1])[i])
    boxpop = np.quantile(popVar, [0,0.25,0.5,0.75,1])
    boxpop = list(map(lambda x: round(x * 100, 2), boxpop))
    print(f"pop for district {i} : {boxpop}")
    
    boxwh = np.quantile(whVar, [0,0.25,0.5,0.75,1])
    boxwh = list(map(lambda x: round(x * 100, 2), boxwh))
    print(f"wh for district {i} : {boxwh}")
    
    boxhis = np.quantile(hisVar, [0,0.25,0.5,0.75,1])
    boxhis = list(map(lambda x: round(x * 100, 2), boxhis))
    print(f"his for district {i} : {boxhis}")
    
    boxblc = np.quantile(blcVar, [0,0.25,0.5,0.75,1])
    boxblc = list(map(lambda x: round(x * 100, 2), boxblc))
    print(f"blc for district {i} : {boxblc}")
    
    boxasian = np.quantile(asianVar, [0,0.25,0.5,0.75,1])
    boxasian = list(map(lambda x: round(x * 100, 2), boxasian))
    print(f"asian for district {i} : {boxasian}")
    
    boxarea = np.quantile(areaVar, [0,0.25,0.5,0.75,1])
    boxarea = list(map(lambda x: round(x * 100, 2), boxarea))
    print(f"area for district {i} : {boxarea}")
    
    print("")
    popVar.clear()
    whVar.clear()
    hisVar.clear()
    blcVar.clear()
    asianVar.clear()
    areaVar.clear()