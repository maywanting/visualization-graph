# make scatter plot 3D's data
import csv
import json

fileName = '3Dsensorpos.csv'

file = open(fileName, 'rt')
dataReader = csv.reader(file)
data = [ e for e in dataReader]
file.close()

dataList = [[], [], []]
for i in range(len(data)):
    dataList[0].append(data[i][0])
    dataList[1].append(data[i][1])
    dataList[2].append(data[i][2])

with open('Xm3.json', 'w') as outfile:
    json.dump(dataList, outfile)
