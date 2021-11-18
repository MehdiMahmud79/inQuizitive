import React from 'react';

import SignupForm from "./components/SignupForm"
import QuizSearchForm from "./components/QuizSearchForm"
import {
  ApolloProvider,
  ApolloLink,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

import Auth from "./utils/auth";


function App() {
  const httpLink = new HttpLink({ uri: "/graphql" });
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: Auth.loggedIn() ? Auth.getToken() : null,
      },
    }));

    return forward(operation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <div className="container fluid">
          <SignupForm />
          
          </div>
    </ApolloProvider>
  );
}
export default App;
