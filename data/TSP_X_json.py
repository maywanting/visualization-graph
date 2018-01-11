# create time series plot-Xmany
import csv
import json

fileXName = 'TSPmany_X.dat'
fileTName = 'TSPmany_T.dat'

# read data in TSP_X.dat file
fileX = open(fileXName, 'rt')
dataReader = csv.reader(fileX)
dataX = [ e for e in dataReader]
fileX.close()

# read data in TSP_T.dat file
fileT = open(fileTName, 'rt')
dataReader = csv.reader(fileT)
dataT = [ e for e in dataReader]
fileT.close()

#  print(dataX)
#  print(dataT)
#  exit()

# merge to json file
dataXList = [[], []]
dataTList = []
for i in range(len(dataX)):
    dataXList[0].append(dataX[i][0])
    dataXList[1].append(dataX[i][1])
    dataTList.append(dataT[i][0])

with open('TSP_X.json', 'w') as outfile:
    json.dump([dataTList, dataXList], outfile)
