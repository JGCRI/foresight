/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getForesight = /* GraphQL */ `
  query GetForesight($id: ID!) {
    getForesight(id: $id) {
      id
      region
      scenario
      value
      createdAt
      updatedAt
    }
  }
`;
export const listForesights = /* GraphQL */ `
  query ListForesights(
    $filter: ModelForesightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForesights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        region
        scenario
        value
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
