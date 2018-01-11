#!/usr/bin/env python
# encoding: utf-8

import csv
import json

fileName = '3Dsensorpos.csv'

file = open(fileName, 'rt')
dataReader = csv.reader(file)
data = [ e for e in dataReader]
file.close()

zoom = 30

for i in range(len(data)):
    data[i][0] = (float(data[i][0])) * zoom
    data[i][1] = (float(data[i][1])) * zoom
    data[i][2] = (float(data[i][2])) * zoom
    print(data[i])

with open('place3D2.json', 'w') as outfile:
    json.dump(data, outfile)

exit()

outData = [[], [], []]
zoom = 7

for i in range(len(data)):
    outData[0].append((float(data[i][0]) + 5) * zoom)
    outData[1].append((float(data[i][1]) + 5) * zoom)
    outData[2].append((float(data[i][2]) + 5) * zoom)

with open('place3D.json', 'w') as outfile:
    json.dump(outData, outfile)
