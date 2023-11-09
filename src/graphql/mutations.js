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
export const createGcamDataTableAggParamGlobal = /* GraphQL */ `
  mutation CreateGcamDataTableAggParamGlobal(
    $input: CreateGcamDataTableAggParamGlobalInput!
  ) {
    createGcamDataTableAggParamGlobal(input: $input) {
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
export const updateGcamDataTableAggParamGlobal = /* GraphQL */ `
  mutation UpdateGcamDataTableAggParamGlobal(
    $input: UpdateGcamDataTableAggParamGlobalInput!
  ) {
    updateGcamDataTableAggParamGlobal(input: $input) {
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
export const deleteGcamDataTableAggParamGlobal = /* GraphQL */ `
  mutation DeleteGcamDataTableAggParamGlobal(
    $input: DeleteGcamDataTableAggParamGlobalInput!
  ) {
    deleteGcamDataTableAggParamGlobal(input: $input) {
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
export const createGcamDataTableAggClass1Global = /* GraphQL */ `
  mutation CreateGcamDataTableAggClass1Global(
    $input: CreateGcamDataTableAggClass1GlobalInput!
  ) {
    createGcamDataTableAggClass1Global(input: $input) {
      id
      scenario
      dataset
      region
      param
      classLabel
      class
      x
      units
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateGcamDataTableAggClass1Global = /* GraphQL */ `
  mutation UpdateGcamDataTableAggClass1Global(
    $input: UpdateGcamDataTableAggClass1GlobalInput!
  ) {
    updateGcamDataTableAggClass1Global(input: $input) {
      id
      scenario
      dataset
      region
      param
      classLabel
      class
      x
      units
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteGcamDataTableAggClass1Global = /* GraphQL */ `
  mutation DeleteGcamDataTableAggClass1Global(
    $input: DeleteGcamDataTableAggClass1GlobalInput!
  ) {
    deleteGcamDataTableAggClass1Global(input: $input) {
      id
      scenario
      dataset
      region
      param
      classLabel
      class
      x
      units
      value
      createdAt
      updatedAt
    }
  }
`;
