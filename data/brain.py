#!/usr/bin/env python
# encoding: utf-8

import csv
import json

fileName = 'brainvertices.csv'

file = open(fileName, 'rt')
dataReader = csv.reader(file)
data = [ e for e in dataReader]
file.close()

res = []
for i in range(len(data)):
    temp = [0, 0, 0]
    temp[0] = float(data[i][0]) / 15.0
    temp[1] = float(data[i][2]) / 15.0 + 0.5 #z green
    temp[2] = float(data[i][1]) / 15.0 + 1 #blue
    res.append(temp)
    print(temp)
#  dataList = [[], [], []]
#  for i in range(len(data)):
    #  dataList[0].append(data[i][0])
    #  dataList[1].append(data[i][1])
    #  dataList[2].append(data[i][2])

#  print(len(data))
#  with open('brainPoint2.json', 'w') as outfile:
    #  json.dump(res, outfile)

#  exit()

fileFaceName = 'brainfaces.csv'

fileFace = open(fileFaceName, 'rt')
dataReader = csv.reader(fileFace)
data = [ e for e in dataReader ]
fileFace.close();

faceData = []
for values in data:
    face = []
    for value in values:
        face.append(res[int(value) - 1])
        #  face[0].append(dataList[0][int(value)-1])
        #  face[1].append(dataList[1][int(value)-1])
        #  face[2].append(dataList[2][int(value)-1])

    faceData.append(face)

with open('brainFace.json', 'w') as outfile:
    json.dump(faceData, outfile)
