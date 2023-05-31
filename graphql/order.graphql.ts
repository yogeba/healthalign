import gql from "graphql-tag";

export const ORDER_BY_ID = gql`
  query OrderById($id: ID!) {
    orderByID(id: $id) {
      id
      status
      events {
        id
        createdAt
      }
    }
  }
`;
