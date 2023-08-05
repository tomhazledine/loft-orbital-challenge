import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const Continent = () => {
    const params = useParams();
    console.log({ test: params.continent });

    const LIST_COUNTRIES = gql`
    {
        continent(code: "${params.continent.toUpperCase()}") {
            name
            code
            countries {
                name
                code
            }
        }
    }
`;

    const { loading, error, data } = useQuery(LIST_COUNTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    console.log({ data });

    return (
        <>
            <h1>Continent: {data.continent.name}</h1>
        </>
    );
};

export default Continent;
