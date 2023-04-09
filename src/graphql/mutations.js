/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createForesight = /* GraphQL */ `
  mutation CreateForesight(
    $input: CreateForesightInput!
    $condition: ModelForesightConditionInput
  ) {
    createForesight(input: $input, condition: $condition) {
      id
      region
      scenario
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateForesight = /* GraphQL */ `
  mutation UpdateForesight(
    $input: UpdateForesightInput!
    $condition: ModelForesightConditionInput
  ) {
    updateForesight(input: $input, condition: $condition) {
      id
      region
      scenario
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteForesight = /* GraphQL */ `
  mutation DeleteForesight(
    $input: DeleteForesightInput!
    $condition: ModelForesightConditionInput
  ) {
    deleteForesight(input: $input, condition: $condition) {
      id
      region
      scenario
      value
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
