#!/usr/bin/env python
import json
import sys

for row in sys.stdin:
    dlist = row.strip().split(",")
    if dlist[2] == "0":
        print "HHHHHHHHHHH"
        dlist[2] = 1
    if dlist[3] == "0":
        print "HHHHHHHHHHH"
        dlist[3] = 1
    print ",".join([str(item) for item in dlist])

