import React from "react";
import { useQuery, gql } from "@apollo/client";

import World from "../components/World";

const LIST_CONTINENTS = gql`
    {
        continents {
            name
            code
            countries {
                name
                code
            }
        }
    }
`;

const Home = () => {
    const { loading, error, data } = useQuery(LIST_CONTINENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <>
            <h1>Home</h1>
            <World continents={data.continents} />
        </>
    );
};

export default Home;
