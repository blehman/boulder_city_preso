#!/usr/bin/env python
import json
import sys

for row in sys.stdin:
    dlist = row.strip().split(",")
    if dlist[2] == "0":
        dlist[2] = 1
    if dlist[3] == "0":
        dlist[3] = 1
    print ",".join([str(item) for item in dlist])

