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
export const onCreateGcamDataTableAggParamGlobal = /* GraphQL */ `
  subscription OnCreateGcamDataTableAggParamGlobal(
    $id: Int
    $scenario: String
    $dataset: String
    $param: String
    $x: Int
  ) {
    onCreateGcamDataTableAggParamGlobal(
      id: $id
      scenario: $scenario
      dataset: $dataset
      param: $param
      x: $x
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
    $dataset: String
    $param: String
    $x: Int
  ) {
    onUpdateGcamDataTableAggParamGlobal(
      id: $id
      scenario: $scenario
      dataset: $dataset
      param: $param
      x: $x
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
    $dataset: String
    $param: String
    $x: Int
  ) {
    onDeleteGcamDataTableAggParamGlobal(
      id: $id
      scenario: $scenario
      dataset: $dataset
      param: $param
      x: $x
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
    $scenario: String
    $dataset: String
    $region: String
    $param: String
  ) {
    onCreateGcamDataTableAggParamRegions(
      id: $id
      scenario: $scenario
      dataset: $dataset
      region: $region
      param: $param
    ) {
      id
      scenario
      dataset
      region
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
    $scenario: String
    $dataset: String
    $region: String
    $param: String
  ) {
    onUpdateGcamDataTableAggParamRegions(
      id: $id
      scenario: $scenario
      dataset: $dataset
      region: $region
      param: $param
    ) {
      id
      scenario
      dataset
      region
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
    $scenario: String
    $dataset: String
    $region: String
    $param: String
  ) {
    onDeleteGcamDataTableAggParamRegions(
      id: $id
      scenario: $scenario
      dataset: $dataset
      region: $region
      param: $param
    ) {
      id
      scenario
      dataset
      region
      param
      x
      units
      value
      createdAt
      updatedAt
    }
  }
`;
