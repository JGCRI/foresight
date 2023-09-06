/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateForesightData = /* GraphQL */ `
  subscription OnCreateForesightData(
    $id: Int
    $region: String
    $scenario: String
    $value: Float
  ) {
    onCreateForesightData(
      id: $id
      region: $region
      scenario: $scenario
      value: $value
    ) {
      id
      region
      scenario
      value
    }
  }
`;
export const onUpdateForesightData = /* GraphQL */ `
  subscription OnUpdateForesightData(
    $id: Int
    $region: String
    $scenario: String
    $value: Float
  ) {
    onUpdateForesightData(
      id: $id
      region: $region
      scenario: $scenario
      value: $value
    ) {
      id
      region
      scenario
      value
    }
  }
`;
export const onDeleteForesightData = /* GraphQL */ `
  subscription OnDeleteForesightData(
    $id: Int
    $region: String
    $scenario: String
    $value: Float
  ) {
    onDeleteForesightData(
      id: $id
      region: $region
      scenario: $scenario
      value: $value
    ) {
      id
      region
      scenario
      value
    }
  }
`;
export const onCreateGcamDataTableAggParamGlobal = /* GraphQL */ `
  subscription OnCreateGcamDataTableAggParamGlobal(
    $id: Int
    $scenario: String
    $param: String
    $x: Int
    $units: String
  ) {
    onCreateGcamDataTableAggParamGlobal(
      id: $id
      scenario: $scenario
      param: $param
      x: $x
      units: $units
    ) {
      id
      scenario
      dataset
      param
      x
      units
      value
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGcamDataTableAggParamGlobal = /* GraphQL */ `
  subscription OnUpdateGcamDataTableAggParamGlobal(
    $id: Int
    $scenario: String
    $param: String
    $x: Int
    $units: String
  ) {
    onUpdateGcamDataTableAggParamGlobal(
      id: $id
      scenario: $scenario
      param: $param
      x: $x
      units: $units
    ) {
      id
      scenario
      dataset
      param
      x
      units
      value
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGcamDataTableAggParamGlobal = /* GraphQL */ `
  subscription OnDeleteGcamDataTableAggParamGlobal(
    $id: Int
    $scenario: String
    $param: String
    $x: Int
    $units: String
  ) {
    onDeleteGcamDataTableAggParamGlobal(
      id: $id
      scenario: $scenario
      param: $param
      x: $x
      units: $units
    ) {
      id
      scenario
      dataset
      param
      x
      units
      value
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGcamDataTableAggParamRegions = /* GraphQL */ `
  subscription OnCreateGcamDataTableAggParamRegions(
    $id: Int
    $region: String
    $scenario: String
    $dataset: String
    $param: String
  ) {
    onCreateGcamDataTableAggParamRegions(
      id: $id
      region: $region
      scenario: $scenario
      dataset: $dataset
      param: $param
    ) {
      id
      region
      scenario
      dataset
      param
      x
      units
      value
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGcamDataTableAggParamRegions = /* GraphQL */ `
  subscription OnUpdateGcamDataTableAggParamRegions(
    $id: Int
    $region: String
    $scenario: String
    $dataset: String
    $param: String
  ) {
    onUpdateGcamDataTableAggParamRegions(
      id: $id
      region: $region
      scenario: $scenario
      dataset: $dataset
      param: $param
    ) {
      id
      region
      scenario
      dataset
      param
      x
      units
      value
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGcamDataTableAggParamRegions = /* GraphQL */ `
  subscription OnDeleteGcamDataTableAggParamRegions(
    $id: Int
    $region: String
    $scenario: String
    $dataset: String
    $param: String
  ) {
    onDeleteGcamDataTableAggParamRegions(
      id: $id
      region: $region
      scenario: $scenario
      dataset: $dataset
      param: $param
    ) {
      id
      region
      scenario
      dataset
      param
      x
      units
      value
      createdAt
      updatedAt
    }
  }
`;
