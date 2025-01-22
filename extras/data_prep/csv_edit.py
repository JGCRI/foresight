import csv
import os
import re

def process_csv(file_path):
    file_name = os.path.splitext(os.path.basename(file_path))[0]
    sanitized_name = re.sub(r'[^a-zA-Z0-9]', '', file_name.replace('_', '')).strip('')
    if not sanitized_name:
        sanitized_name = 'dataset'

    output_file = os.path.join(os.path.dirname(file_path), f"{file_name}_edited.csv")
    allowed_columns = {'scenario', 'param', 'x', 'value', 'region', 'class', 'classLabel', 'units', 'dataset'}
    duplicate_subset = {'dataset', 'param', 'scenario', 'x', 'region', 'class'}

    try:
        with open(file_path, mode='r', newline='', encoding='utf-8') as csv_file, \
             open(output_file, mode='w', newline='', encoding='utf-8') as output_csv_file:

            reader = csv.DictReader(csv_file)
            original_columns = reader.fieldnames

            if original_columns is None:
                raise ValueError("The file appears to be empty or malformed.")

            print("Original Column Names:", original_columns)

            # Normalize to lowercase
            required_columns = ['scenario', 'region', 'value', 'x']
            normalized_columns = {col: col.lower() for col in original_columns}
            
            # Handle 'x' column
            x_candidates = {'x', 'date', 'time', 'year'}
            x_column = next((col for col in x_candidates if col in normalized_columns.values()), None)
            if x_column:
                print(f"Mapping '{x_column}' column to 'x'.")
                normalized_columns[x_column] = 'x'
            else:
                if 'x' not in normalized_columns.values():
                    print("No 'x', 'date', 'time', or 'year' column found.")
                    normalized_columns['x'] = 'x'
            
            # Handle 'dataset' column
            if 'dataset' not in normalized_columns.values():
                print("No 'dataset' column found. Adding one.")
                normalized_columns['dataset'] = 'dataset'

            # Handle 'param' column
            if 'param' not in normalized_columns.values():
                if 'parameter' in normalized_columns.values():
                    print("Renaming 'parameter' column to 'param'.")
                    normalized_columns['parameter'] = 'param'
                else:
                    print("No 'param' or 'parameter' column found. Adding 'param'.")
                    normalized_columns['param'] = 'param'

            # Handle 'class' column
            if 'class' not in normalized_columns.values():
                if 'sector' in normalized_columns.values():
                    print("Renaming 'sector' column to 'class'.")
                    normalized_columns['sector'] = 'class'
                else:
                    print("No 'class' column found. Adding 'class'.")
                    normalized_columns['class'] = 'class'

            if 'classLabel' not in normalized_columns.values():
                print("No 'classLabel' column found. Adding one.")
                normalized_columns['classLabel'] = 'class'

            # Handle 'units' column
            units_column = 'units' if 'units' in normalized_columns.values() else None
            if not units_column and 'unit' in normalized_columns.values():
                print("Renaming 'unit' column to 'units'.")
                normalized_columns['unit'] = 'units'
                units_column = 'units'
            elif not units_column:
                print("No 'unit' or 'units' column found. Adding 'units'.")
                normalized_columns['units'] = 'units'

            print(f"Normalized Columns: {', '.join(normalized_columns)}")
            output_columns = [col for col in allowed_columns if col in normalized_columns.values()]
            print(f"Output Columns: {', '.join(output_columns)}")
            missing_columns =  [x for x in required_columns if x not in output_columns]

            if missing_columns:
                print(f"Missing required columns: {', '.join(missing_columns)}")
                return
            
            writer = csv.DictWriter(output_csv_file, fieldnames=output_columns)
            writer.writeheader()

            unique_rows = set()

            for row in reader:
                normalized_row = {normalized_columns[key]: value for key, value in row.items()}
                if 'groundwater' in normalized_columns.values():
                    subresource_value = normalized_row.get('groundwater', '')
                    if subresource_value.endswith('-water withdrawals'):
                        normalized_row['region'] = subresource_value.replace('-water withdrawals', '').strip()
                        
                normalized_row['dataset'] = normalized_row.get('dataset', sanitized_name)
                normalized_row['param'] = normalized_row.get('param', sanitized_name)

                if 'units' not in normalized_row or normalized_row['units'] in (None, '', 'nan', 'NaN'):
                    normalized_row['units'] = 'Unitless'
                param_value = normalized_row.get('param', 'unknown')
                normalized_row['units'] = f"{param_value} ({normalized_row['units']})"

                class_value = None
                class_label_value = None
                sector_candidates = ['sector', 'output', 'fuel', 'subresource']
                subsector_col = 'subsector' if 'subsector' in normalized_columns.values() else None
                technology_col = 'technology' if 'technology' in normalized_columns.values() else None

                for candidate in sector_candidates:
                    if candidate in normalized_columns.values():
                        class_value = normalized_row.get(candidate)
                        class_label_value = candidate
                        break

                if subsector_col:
                    class_value = normalized_row[subsector_col]
                    class_label_value = "subsector"

                if technology_col and class_value != normalized_row.get(technology_col):
                    class_value = f"{class_value} - {normalized_row[technology_col]}"
                    class_label_value = "subsector|technology"

                normalized_row['class'] = class_value if class_value else 'class1'
                normalized_row['classLabel'] = class_label_value if class_label_value else 'class'

                duplicate_key = tuple(normalized_row.get(col, '').strip() for col in duplicate_subset)

                if duplicate_key in unique_rows:
                    continue
                unique_rows.add(duplicate_key)

                filtered_row = {col: normalized_row[col] for col in output_columns if col in normalized_row}
                writer.writerow(filtered_row)

        print(f"File processed successfully. The output file is saved as: {output_file}")

    except FileNotFoundError:
        print(f"Error: The file at '{file_path}' does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")


# Replace with path to CSV file
process_csv('C:/Data Cleaning/groundwater_production_full_900.csv')
