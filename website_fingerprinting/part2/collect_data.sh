#!/bin/bash

# python3 automate.py
#     --part 2
#     --domains google.com,nytimes.com
#     --num_traces_per_domain 4
#     --out_filename traces.json

python3 automate.py \
    --part 2 \
    --num_traces_per_domain 20 \
    --out_filename traces.json