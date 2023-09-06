import os
import shutil
import csv
import json
import subprocess

def csv_to_dynamodb_json(file_name, table_name, data_types, batch_size=25, keep_batch_files=True, folder_out='batch_files'):
    if os.path.exists(folder_out):
        shutil.rmtree(folder_out)
    os.mkdir(folder_out)

    with open(file_name, 'r', encoding='utf-8-sig') as file:
        reader = csv.DictReader(file)
        items = []
        batch_index = 0
        for i, row in enumerate(reader):
            item = {}
            for column, value in row.items():
                data_type = data_types[column]
                item[column] = {data_type: value}
            items.append({'PutRequest': {'Item': item}})
            if (i + 1) % batch_size == 0:
                batch = {table_name: items}
                with open(f'{folder_out}/batch_{batch_index}.json', 'w') as batch_file:
                    json.dump(batch, batch_file)
                print("..............................")
                print(f"Processing batch file {batch_index + 1}")
                subprocess.call(["aws", "dynamodb", "batch-write-item", "--request-items", f"file://{folder_out}/batch_{batch_index}.json"])
                if not keep_batch_files:
                    os.remove(f'{folder_out}/batch_{batch_index}.json')
                items = []
                batch_index += 1
        if items:
            batch = {table_name: items}
            with open(f'{folder_out}/batch_{batch_index}.json', 'w') as batch_file:
                json.dump(batch, batch_file)
            print("..............................")
            print(f"Processing batch file {batch_index + 1}")
            subprocess.call(["aws", "dynamodb", "batch-write-item", "--request-items", f"file://{folder_out}/batch_{batch_index}.json"])
            if not keep_batch_files:
                os.remove(f'{folder_out}/batch_{batch_index}.json')

file_name = 'C:/Z/models/foresight/extras/data_prep/gcamDataTable_aggParam_regions.csv'
table_name = 'gcamDataTable_aggParam_regions'
data_types = {
    'id':'N',
    'scenario': 'S',
    'dataset': 'S', # foresight_v1_2023
    'region': 'S',
    'param': 'S',
    'x': 'N',    
    'units': 'S',
    'value':'N',
    'createdAt':'S',
    'updatedAt':'S'
}

csv_to_dynamodb_json(file_name, table_name, data_types, folder_out='C:/Z/models/foresight_data/batch_files')


# To get count of all items in the table
# aws dynamodb scan --table-name gcamDataTable_aggParam_regions --select "COUNT"