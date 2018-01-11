#create scatter plot 2D data
import csv
import json

fileName = 'Xm2.dat'

file = open(fileName, 'rt')
dataReader = csv.reader(file)
data = [ e for e in dataReader]
file.close()

dataList = [[], []]
for i in range(len(data)):
    dataList[0].append(data[i][0])
    dataList[1].append(data[i][1])

with open('Xm2.json', 'w') as outfile:
    json.dump(dataList, outfile)
