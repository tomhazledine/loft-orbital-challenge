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
            <h1>Get Started</h1>
            <p>Select a continent to start planning your dream* trip.</p>
            <p>
                Assuming you have very limited dreams of nearest-neighbour
                travel plans.
            </p>
            <World continents={data.continents} />
        </>
    );
};

export default Home;
