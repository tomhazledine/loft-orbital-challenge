import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { shapes } from "../data/shapes";
import { capitals } from "../data/capitals";
import { calculateTrip } from "../utils/trips";

import ContinentMap from "../components/ContinentMap";

const Continent = () => {
    const params = useParams();

    const LIST_COUNTRIES = gql`
        {
            continent(code: "${params.continent.toUpperCase()}") {
                name
                code
                countries {
                    name
                    code
                    capital
                    currency
                    currencies
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(LIST_COUNTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const countries = data.continent.countries
        .map(country => {
            const shape = shapes[country.name];
            if (!shape) return false;
            const capital = capitals[country.code];
            return { ...country, shape, capitalShape: capital };
        })
        .filter(country => country);

    const handleTripGeneration = startCapital => {
        console.log(`Calculating trip for ${startCapital}`);
        const trip = calculateTrip(startCapital, countries);
        console.log({ trip });
    };

    return (
        <>
            <h1>Continent: {data.continent.name}</h1>
            <ContinentMap
                countries={countries}
                code={data.continent.code}
                handleTripGeneration={handleTripGeneration}
            />
        </>
    );
};

export default Continent;
