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
