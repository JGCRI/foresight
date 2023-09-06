/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGcamDataTableAggParamGlobal = /* GraphQL */ `
  query GetGcamDataTableAggParamGlobal($id: Int!, $scenario: String!) {
    getGcamDataTableAggParamGlobal(id: $id, scenario: $scenario) {
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
export const listGcamDataTableAggParamGlobals = /* GraphQL */ `
  query ListGcamDataTableAggParamGlobals(
    $filter: TableGcamDataTableAggParamGlobalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGcamDataTableAggParamGlobals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
