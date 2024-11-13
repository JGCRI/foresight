import os
import shutil
import csv
import json
import subprocess
import time


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
                write_to_dynamodb_with_retry(folder_out, batch_index)
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
            write_to_dynamodb_with_retry(folder_out, batch_index)
            if not keep_batch_files:
                os.remove(f'{folder_out}/batch_{batch_index}.json')


def write_to_dynamodb_with_retry(folder_out, batch_index, retries=10, delay=5):
    success = False
    attempts = 0
    while not success and attempts < retries:
        try:
            result = subprocess.call(
                ["aws", "dynamodb", "batch-write-item", "--request-items", f"file://{folder_out}/batch_{batch_index}.json"],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )
            print(result)
            if result == 0:
                success = True
            else:
                if result == 254:
                    attempts += 1
                    print(f"ProvisionedThroughputExceededException encountered. Retrying {attempts}/{retries}...")
                    time.sleep(delay)
                    delay += delay
                else:
                    print(f"Error: {result}")
                    raise subprocess.CalledProcessError(result, "aws dynamodb batch-write-item")
        except subprocess.CalledProcessError as e:
            print(f"Error: {e}")
            raise


# Foresight Table 1: gcamDataTable_aggClass1_regions (Dashboard: Top 10 Country Plot)
#...................................................................................
file_name_i = 'C:/Dynamo Data Prep/gcamDataTable_aggClass1_regions.csv'
table_name_i = 'gcamDataTable_aggClass1_regions'
data_types_i = {
    'id':'N',
    'param': 'S',
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
#   param: String!,
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
folder_out_i='C:/Dynamo Data Prep/post/gcamDataTable_aggClass1_regions'

csv_to_dynamodb_json(file_name=file_name_i, table_name=table_name_i, data_types=data_types_i, folder_out=folder_out_i)  # Send to AWS DynamoDB

# Foresight Table 2: gcamDataTable_aggParam_regions (Dashboard: Map by param)
#...................................................................................
file_name_i = 'C:/Dynamo Data Prep/gcamDataTable_aggParam_regions.csv'
table_name_i = 'gcamDataTable_aggParam_regions'
data_types_i = {
    'id':'N',
    'param': 'S',
    'scenario': 'S',
    'dataset': 'S',
    'region': 'S',
    'x': 'N',    
    'units': 'S',
    'value':'N',
    'createdAt':'S',
    'updatedAt':'S'
#   id: Int!
#   param: String!
#   scenario: String!
#   dataset: String!
#   region: String!
#   x: Int!    
#   units: String!
#   value: Float!
#   createdAt: String!
#   updatedAt:String!
}
folder_out_i='C:/Dynamo Data Prep/post/gcamDataTable_aggParam_regions'

csv_to_dynamodb_json(file_name=file_name_i, table_name=table_name_i, data_types=data_types_i, folder_out=folder_out_i)  # Send to AWS DynamoDB

# Foresight Table 3: gcamDataTable_aggParam_global (Dashboard: Lines)
#...................................................................................
file_name_i = 'C:/Dynamo Data Prep/gcamDataTable_aggParam_global.csv'
table_name_i = 'gcamDataTable_aggParam_global'
data_types_i = {
    'id':'N',
    'param': 'S',
    'scenario': 'S',
    'dataset': 'S',
    'region': 'S',
    'x': 'N',    
    'units': 'S',
    'value':'N',
    'createdAt':'S',
    'updatedAt':'S'
  #id: Int!
  #param: String!
  #scenario: String!
  #dataset: String!
  #region: String!
  #x: Int!    
  #units: String!
  #value: Float!
  #createdAt: String!
  #updatedAt:String!
}
folder_out_i='C:/Dynamo Data Prep/post/gcamDataTable_aggParam_global'

csv_to_dynamodb_json(file_name=file_name_i, table_name=table_name_i, data_types=data_types_i, folder_out=folder_out_i)  # Send to AWS DynamoDB

# Foresight Table 4: gcamDataTable_aggClass1_global (Dashboard: Lines by class)
#...................................................................................
file_name_i = 'C:/Dynamo Data Prep/gcamDataTable_aggClass1_global.csv'
table_name_i = 'gcamDataTable_aggClass1_global'
data_types_i = {
    'id':'N',
    'param': 'S',
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
  #id: Int!
  #param: String!
  #scenario: String!
  #dataset: String!
  #region: String!
  #classLabel: String!
  #class: String!
  #x: Int!    
  #units: String!
  #value: Float!
  #createdAt: String!
  #updatedAt:String!
}
folder_out_i='C:/Dynamo Data Prep/post/gcamDataTable_aggClass1_global'

csv_to_dynamodb_json(file_name=file_name_i, table_name=table_name_i, data_types=data_types_i, folder_out=folder_out_i)  # Send to AWS DynamoDB

#python extras/data_prep/csv2json2dynamo.py

# To get count of all items in the table
# aws dynamodb scan --table-name gcamDataTable_aggParam_regions --select "COUNT" # 14688
# aws dynamodb scan --table-name gcamDataTable_aggClass1_regions --select "COUNT" # 125241
# aws dynamodb scan --table-name gcamDataTable_aggParam_global --select "COUNT" # 459
# aws dynamodb scan --table-name gcamDataTable_aggClass1_global --select "COUNT" # 4191
