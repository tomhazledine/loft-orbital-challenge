import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Continent from "./pages/Continent";
import Layout from "./pages/Layout";
import Error from "./pages/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/continent/:continent",
                element: <Continent />
            }
        ]
    },
    {
        path: "*",
        element: <Error msg="404: page not found" />
    }
]);
