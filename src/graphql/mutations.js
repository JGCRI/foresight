/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createGcamDataTableAggParamGlobal = /* GraphQL */ `
  mutation CreateGcamDataTableAggParamGlobal(
    $input: CreateGcamDataTableAggParamGlobalInput!
  ) {
    createGcamDataTableAggParamGlobal(input: $input) {
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
export const updateGcamDataTableAggParamGlobal = /* GraphQL */ `
  mutation UpdateGcamDataTableAggParamGlobal(
    $input: UpdateGcamDataTableAggParamGlobalInput!
  ) {
    updateGcamDataTableAggParamGlobal(input: $input) {
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
export const deleteGcamDataTableAggParamGlobal = /* GraphQL */ `
  mutation DeleteGcamDataTableAggParamGlobal(
    $input: DeleteGcamDataTableAggParamGlobalInput!
  ) {
    deleteGcamDataTableAggParamGlobal(input: $input) {
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
export const createGcamDataTableAggParamRegions = /* GraphQL */ `
  mutation CreateGcamDataTableAggParamRegions(
    $input: CreateGcamDataTableAggParamRegionsInput!
  ) {
    createGcamDataTableAggParamRegions(input: $input) {
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
export const updateGcamDataTableAggParamRegions = /* GraphQL */ `
  mutation UpdateGcamDataTableAggParamRegions(
    $input: UpdateGcamDataTableAggParamRegionsInput!
  ) {
    updateGcamDataTableAggParamRegions(input: $input) {
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
export const deleteGcamDataTableAggParamRegions = /* GraphQL */ `
  mutation DeleteGcamDataTableAggParamRegions(
    $input: DeleteGcamDataTableAggParamRegionsInput!
  ) {
    deleteGcamDataTableAggParamRegions(input: $input) {
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
