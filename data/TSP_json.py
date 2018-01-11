#create time series plot
import csv
import json

fileXName = 'TSP_X.dat'
fileTName = 'TSP_T.dat'

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

# merge to json file
dataXList = []
dataTList = []
for i in range(len(dataX)):
    dataXList.append(dataX[i][0])
    dataTList.append(dataT[i][0])

with open('TSP.json', 'w') as outfile:
    json.dump([dataTList, dataXList], outfile)
