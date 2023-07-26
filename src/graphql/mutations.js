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
export const createForesightData = /* GraphQL */ `
  mutation CreateForesightData($input: CreateForesightDataInput!) {
    createForesightData(input: $input) {
      id
      region
      scenario
      value
    }
  }
`;
export const updateForesightData = /* GraphQL */ `
  mutation UpdateForesightData($input: UpdateForesightDataInput!) {
    updateForesightData(input: $input) {
      id
      region
      scenario
      value
    }
  }
`;
export const deleteForesightData = /* GraphQL */ `
  mutation DeleteForesightData($input: DeleteForesightDataInput!) {
    deleteForesightData(input: $input) {
      id
      region
      scenario
      value
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
