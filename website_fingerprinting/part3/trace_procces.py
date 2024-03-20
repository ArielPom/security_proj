import json 
import numpy as np 
 
with open("traces.json", "r") as f: 
    # Load contents from file as JSON data 
    data = json.loads(f.read()) 
 
    # Convert 2D array into Numpy for data processing 
    traces = np.array(data["traces"]) 
    labels = data["labels"]
    
    # Create a dictionary to group traces by labels
    label_traces_dict = {}
    for label, trace_arr in zip(labels, traces):
        if label not in label_traces_dict:
            label_traces_dict[label] = []
        label_traces_dict[label].append(trace_arr)

    # Iterate over grouped traces and calculate aggregated statistics
    for label, traces_list in label_traces_dict.items():
        # Concatenate all traces with the same label
        combined_traces = np.concatenate(traces_list)

        # Calculate statistics for combined traces
        min_val = np.min(combined_traces)
        max_val = np.max(combined_traces)
        mean_val = np.mean(combined_traces)
        median_val = np.median(combined_traces)
        variance_val = np.var(combined_traces)

        # Print the statistics
        print(f"Label: {label}")
        print(f"Minimum: {min_val}, Maximum: {max_val}")
        print(f"Mean: {mean_val}, Median: {median_val}, Variance: {variance_val:.3f}")
        print()