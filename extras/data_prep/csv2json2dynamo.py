import os
import shutil
import csv
import json
import subprocess

# Define the Function
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



# Foresight Table 1: gcamDataTable_aggClass1_regions (Dashboard: Top 10 Country Plot)
#...................................................................................
file_name_i = 'C:/Z/models/foresight/extras/data_prep/gcamDataTable_aggClass1_regions.csv'
table_name_i = 'gcamDataTable_aggClass1_regions'
data_types_i = {
    'id':'N',
    'scenario': 'S',
    'dataset': 'S',
    'region': 'S',
    'classLabel': 'S',
    'class': 'S',
    'x': 'N',    
    'units': 'S',
    'value':'N',
    'createdAt':'S',
    'updatedAt':'S'
#   id: Int!
#   scenario: String!
#   dataset: String!
#   region: String!
#   classLabel: String!
#   class: String!
#   x: Int!    
#   units: String!
#   value: Float!
#   createdAt: String!
#   updatedAt:String!
}
folder_out_i='C:/Z/models/foresight_data/batch_files/gcamDataTable_aggClass1_regions'

csv_to_dynamodb_json(file_name=file_name_i, table_name=table_name_i, data_types=data_types_i, folder_out=folder_out_i)  # Send to AWS DynamoDB

# # Foresight Table 2: gcamDataTable_aggParam_regions (Dashboard: Map by param)
# #...................................................................................
# file_name_i = 'C:/Z/models/foresight/extras/data_prep/gcamDataTable_aggParam_regions.csv'
# table_name_i = 'gcamDataTable_aggParam_regions'
# data_types_i = {
#     'id':'N',
#     'scenario': 'S',
#     'dataset': 'S',
#     'region': 'S',
#     'param': 'S',
#     'x': 'N',    
#     'units': 'S',
#     'value':'N',
#     'createdAt':'S',
#     'updatedAt':'S'
# #   id: Int!
# #   scenario: String!
# #   dataset: String!
# #   region: String!
# #   param: String!
# #   x: Int!    
# #   units: String!
# #   value: Float!
# #   createdAt: String!
# #   updatedAt:String!
# }
# folder_out='C:/Z/models/foresight_data/batch_files/gcamDataTable_aggParam_regions'

# csv_to_dynamodb_json(file_name=file_name_i, table_name=table_name_i, data_types=data_types_i, folder_out=folder_out_i)  # Send to AWS DynamoDB

# # Foresight Table 3: gcamDataTable_aggParam_regions (Dashboard: Map by param)
# #...................................................................................
# file_name_i = 'C:/Z/models/foresight/extras/data_prep/gcamDataTable_aggParam_global.csv'
# table_name_i = 'gcamDataTable_aggParam_global'
# data_types_i = {
#     'id':'N',
#     'scenario': 'S',
#     'dataset': 'S',
#     'param': 'S',
#     'x': 'N',    
#     'units': 'S',
#     'value':'N',
#     'createdAt':'S',
#     'updatedAt':'S'
#   #id: Int!
#   #scenario: String!
#   #dataset: String!
#   #param: String!
#   #x: Int!    
#   #units: String!
#   #value: Float!
#   #createdAt: String!
#   #updatedAt:String!
# }
# folder_out_i='C:/Z/models/foresight_data/batch_files/gcamDataTable_aggParam_global'

# csv_to_dynamodb_json(file_name=file_name_i, table_name=table_name_i, data_types=data_types_i, folder_out=folder_out_i)  # Send to AWS DynamoDB

# # To get count of all items in the table
# # aws dynamodb scan --table-name gcamDataTable_aggParam_regions --select "COUNT"
# # aws dynamodb scan --table-name gcamDataTable_aggClass1_regions --select "COUNT"