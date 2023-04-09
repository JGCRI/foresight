/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateForesight = /* GraphQL */ `
  subscription OnCreateForesight(
    $filter: ModelSubscriptionForesightFilterInput
  ) {
    onCreateForesight(filter: $filter) {
      id
      region
      scenario
      value
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateForesight = /* GraphQL */ `
  subscription OnUpdateForesight(
    $filter: ModelSubscriptionForesightFilterInput
  ) {
    onUpdateForesight(filter: $filter) {
      id
      region
      scenario
      value
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteForesight = /* GraphQL */ `
  subscription OnDeleteForesight(
    $filter: ModelSubscriptionForesightFilterInput
  ) {
    onDeleteForesight(filter: $filter) {
      id
      region
      scenario
      value
      createdAt
      updatedAt
    }
  }
`;
export const onCreateForesightData = /* GraphQL */ `
  subscription OnCreateForesightData(
    $id: Int
    $region: String
    $scenario: String
    $value: Float
  ) {
    onCreateForesightData(
      id: $id
      region: $region
      scenario: $scenario
      value: $value
    ) {
      id
      region
      scenario
      value
    }
  }
`;
export const onUpdateForesightData = /* GraphQL */ `
  subscription OnUpdateForesightData(
    $id: Int
    $region: String
    $scenario: String
    $value: Float
  ) {
    onUpdateForesightData(
      id: $id
      region: $region
      scenario: $scenario
      value: $value
    ) {
      id
      region
      scenario
      value
    }
  }
`;
export const onDeleteForesightData = /* GraphQL */ `
  subscription OnDeleteForesightData(
    $id: Int
    $region: String
    $scenario: String
    $value: Float
  ) {
    onDeleteForesightData(
      id: $id
      region: $region
      scenario: $scenario
      value: $value
    ) {
      id
      region
      scenario
      value
    }
  }
`;
