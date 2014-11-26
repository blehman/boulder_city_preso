#!/usr/bin/env python
import json
import sys
import random
# globals
seed = 1
radmom_number_count = 10000
file_path="../data/complete_set.csv"
with open(file_path,"r") as f:
    random.seed(seed)
    random_lines=random_lines=random.sample(f.readlines(),radmom_number_count)

for line in random_lines:
    print line.strip()



