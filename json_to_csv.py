import json
import csv
import sys
import os

def json_to_csv(json_file_path, csv_file_path):
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        if not isinstance(data, list):
            print("Error: JSON data must be a list of objects.")
            return

        if not data:
            print("Error: JSON file is empty.")
            return

        # Collect all unique keys from all dictionaries
        fieldnames = set()
        for entry in data:
            fieldnames.update(entry.keys())
        
        fieldnames = sorted(list(fieldnames))

        # Write to CSV
        with open(csv_file_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(data)

        print(f"Successfully converted '{json_file_path}' to '{csv_file_path}'.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Hardcoded paths based on user workspace
    json_path = r"c:\Users\casgi\OneDrive\Documents\GitHub\Grid-Trails-AB\output_example.json"
    csv_path = r"c:\Users\casgi\OneDrive\Documents\GitHub\Grid-Trails-AB\output_example.csv"
    
    json_to_csv(json_path, csv_path)
