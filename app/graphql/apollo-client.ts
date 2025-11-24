import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
})

const authLink = setContext((_, { headers }) => {
  // Check if window exists (so code only runs in browser)
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  console.log(token)
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }
})

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
})
