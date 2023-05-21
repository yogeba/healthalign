// pages/api/client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const API_KEY = process.env.RYE_API_KEY || "";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = createHttpLink({
  uri: "https://graphql.api.rye.com/v1/query",
});

const authLink = setContext((_, { headers }) => {
  // Get the user's IP address from the request headers
  try {
    const ip =
      (headers && (headers["x-real-ip"] || headers["x-forwarded-for"])) || "";
    return {
      headers: {
        ...headers,
        Authorization: "Basic " + Buffer.from(API_KEY + ":").toString("base64"),
        "x-rye-shopper-ip": ip,
      },
    };
  } catch (error) {
    console.error("Error in setting context:", error);
    return {
      headers,
    };
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
