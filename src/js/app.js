import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { router } from "./routes";

const client = new ApolloClient({
    uri: "https://countries.trevorblades.com",
    cache: new InMemoryCache()
});

const App = ({}) => {
    return (
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    );
};

const mountNode = document.getElementById("app");
createRoot(mountNode).render(<App />);
