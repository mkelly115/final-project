import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./components/SideNav/sideNav";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <React.StrictMode>
        <ApolloProvider client={client}>
          <SideNav />
          <Outlet />
        </ApolloProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
