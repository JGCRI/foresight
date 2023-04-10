/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
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
