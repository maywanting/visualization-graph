import csv   #csvモジュールをインポートする
import numpy as np
from operator import itemgetter, attrgetter
import json
import collections as cl

f = open('CCM_weight.csv', 'rt')
dataReader = csv.reader(f)
data = [ e for e in dataReader]
f.close()
 #n行1列のテキスト行列

len = 102

weight = [[0 for m in range(3)] for n in range(len * len)]

for i in range(len):
    for j in range(len):
        weight[ i * len + j ][0] = i
        weight[ i * len + j ][1] = j
        weight[ i * len + j ][2] = float(data[i][j])

weightSort = sorted(weight, key=itemgetter(2), reverse = True)
print(weightSort[1][0])

ys = cl.OrderedDict()
for i in range(len*len):
    w = cl.OrderedDict()
    w["from"] = weightSort[i][0]
    w["to"] = weightSort[i][1]
    w["weight"] = weightSort[i][2]
    ys[i] = w

f = open('sortWeight.json', 'w')
json.dump(ys, f, indent = 4)
