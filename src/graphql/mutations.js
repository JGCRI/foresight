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
export const createGcamDataTableAggClass1Regions = /* GraphQL */ `
  mutation CreateGcamDataTableAggClass1Regions(
    $input: CreateGcamDataTableAggClass1RegionsInput!
  ) {
    createGcamDataTableAggClass1Regions(input: $input) {
      id
      scenario
      dataset
      region
      classLabel
      class
      x
      units
      param
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateGcamDataTableAggClass1Regions = /* GraphQL */ `
  mutation UpdateGcamDataTableAggClass1Regions(
    $input: UpdateGcamDataTableAggClass1RegionsInput!
  ) {
    updateGcamDataTableAggClass1Regions(input: $input) {
      id
      scenario
      dataset
      region
      classLabel
      class
      x
      units
      param
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteGcamDataTableAggClass1Regions = /* GraphQL */ `
  mutation DeleteGcamDataTableAggClass1Regions(
    $input: DeleteGcamDataTableAggClass1RegionsInput!
  ) {
    deleteGcamDataTableAggClass1Regions(input: $input) {
      id
      scenario
      dataset
      region
      classLabel
      class
      x
      units
      param
      value
      createdAt
      updatedAt
    }
  }
`;
