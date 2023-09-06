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
export const getForesightData = /* GraphQL */ `
  query GetForesightData($id: Int!, $region: String!) {
    getForesightData(id: $id, region: $region) {
      id
      region
      scenario
      value
    }
  }
`;
export const listForesightData = /* GraphQL */ `
  query ListForesightData(
    $filter: TableForesightDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForesightData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        region
        scenario
        value
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
      totalCount
    }
  }
`;
export const getGcamDataTableAggParamRegions = /* GraphQL */ `
  query GetGcamDataTableAggParamRegions($id: Int!, $region: String!) {
    getGcamDataTableAggParamRegions(id: $id, region: $region) {
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
export const listGcamDataTableAggParamRegions = /* GraphQL */ `
  query ListGcamDataTableAggParamRegions(
    $filter: TableGcamDataTableAggParamRegionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGcamDataTableAggParamRegions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      totalCount
    }
  }
`;
