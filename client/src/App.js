import React from 'react';


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./utils/auth";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
  useQuery,
  gql,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" });
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
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* <Route exact path="/quiz" component={CreateQuiz} /> */}
          <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
export default App;
