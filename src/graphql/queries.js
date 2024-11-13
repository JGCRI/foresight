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
      __typename
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGcamDataTableAggClass1Regions = /* GraphQL */ `
  query GetGcamDataTableAggClass1Regions($id: String!, $param: String!) {
    getGcamDataTableAggClass1Regions(id: $id, param: $param) {
      id
      param
      scenario
      dataset
      region
      classLabel
      class
      x
      units
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listGcamDataTableAggClass1Regions = /* GraphQL */ `
  query ListGcamDataTableAggClass1Regions(
    $filter: TableGcamDataTableAggClass1RegionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGcamDataTableAggClass1Regions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        param
        scenario
        dataset
        region
        classLabel
        class
        x
        units
        value
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGcamDataTableAggParamRegions = /* GraphQL */ `
  query GetGcamDataTableAggParamRegions($id: String!, $param: String!) {
    getGcamDataTableAggParamRegions(id: $id, param: $param) {
      id
      param
      scenario
      dataset
      region
      x
      units
      value
      createdAt
      updatedAt
      __typename
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
        param
        scenario
        dataset
        region
        x
        units
        value
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGcamDataTableAggParamGlobal = /* GraphQL */ `
  query GetGcamDataTableAggParamGlobal($id: String!, $param: String!) {
    getGcamDataTableAggParamGlobal(id: $id, param: $param) {
      id
      param
      scenario
      dataset
      region
      x
      units
      value
      createdAt
      updatedAt
      __typename
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
        param
        scenario
        dataset
        region
        x
        units
        value
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGcamDataTableAggClass1Global = /* GraphQL */ `
  query GetGcamDataTableAggClass1Global($id: String!, $param: String!) {
    getGcamDataTableAggClass1Global(id: $id, param: $param) {
      id
      param
      scenario
      dataset
      region
      classLabel
      class
      x
      units
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listGcamDataTableAggClass1Globals = /* GraphQL */ `
  query ListGcamDataTableAggClass1Globals(
    $filter: TableGcamDataTableAggClass1GlobalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGcamDataTableAggClass1Globals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        param
        scenario
        dataset
        region
        classLabel
        class
        x
        units
        value
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
