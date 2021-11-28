import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";

import App from './App';
import reportWebVitals from './reportWebVitals';
import Auth from "./utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';


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
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

reportWebVitals();
