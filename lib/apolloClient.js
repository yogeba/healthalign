//lib/apolloClient.js

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/link-context";

const httpLink = createHttpLink({
  uri: "https://graphql.api.rye.com/v1/query",
});

const encodedKey = btoa(process.env.NEXT_PUBLIC_RYE_API_KEY + ":");

// const getAuthHeader = () => {
//   return "Basic " + btoa(this.apiKey + ":");
// };

console.log(encodedKey);

const authLink = setContext((_, { headers }) => {
  const encodedKey = btoa(process.env.NEXT_PUBLIC_RYE_API_KEY + ":");

  //TODO
  const authHeader = `Basic ${encodedKey}`;

  return {
    headers: {
      ...headers,
      Authorization: `${authHeader}`,
      "x-rye-shopper-ip": "49.207.211.237",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
