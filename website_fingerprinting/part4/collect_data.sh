#!/bin/bash

python3 automate.py \
    --part 4 \
    --num_traces_per_domain 20 \
    --out_filename traces.json \
    --enable_countermeasure true \
    --trace_length 1000