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
        <div className="stack">
            <div className="prompt">
                <h1 className="prompt__heading">Get Started</h1>
                <p>
                    Select a continent to start planning your dream
                    <sup>[^1]</sup> trip.
                </p>
                <p className="prompt__footnote">
                    Assuming you have very limited dreams of nearest-neighbour
                    travel plans.
                </p>
            </div>
            <World continents={data.continents} />
        </div>
    );
};

export default Home;
