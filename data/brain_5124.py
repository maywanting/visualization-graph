#!/usr/bin/env python
# encoding: utf-8

import csv
import json

fileName = 'brainvertices_5124.csv'

file = open(fileName, 'rt')
dataReader = csv.reader(file)
data = [ e for e in dataReader]
file.close()

res = []
for i in range(len(data)):
    temp = [0, 0, 0]
    temp[0] = float(data[i][0]) / 13.0
    temp[1] = float(data[i][2]) / 13.0 - 0.5 #z green
    temp[2] = float(data[i][1]) / 13.0 + 2.5 #blue
    #  print(temp)
    res.append(temp)

#  with open('brainPoint3.json', 'w') as outfile:
    #  json.dump(res, outfile)

#  exit()

fileFaceName = 'brainfaces_5124.csv'

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
    #  print(face)

    faceData.append(face)

with open('brainFace3.json', 'w') as outfile:
    json.dump(faceData, outfile)
