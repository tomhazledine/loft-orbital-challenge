import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { shapes } from "../data/shapes";
import { capitals } from "../data/capitals";
import { calculateTrip } from "../utils/trips";

import ContinentMap from "../components/ContinentMap";
import TripOverview from "../components/TripOverview";

const Continent = () => {
    const params = useParams();
    const [trip, setTrip] = useState({
        start: false,
        continent: false,
        limit: 8,
        route: false
    });

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

    useEffect(() => {
        if (data && !loading && !error) {
            setTrip(old => ({ ...old, continent: data.continent.name }));
        }
    }, [data]);

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
        setTrip(old => ({
            ...old,
            start: startCapital,
            route: trip.slice(0, old.limit)
        }));
    };

    return (
        <>
            <TripOverview trip={trip} />
            <ContinentMap
                countries={countries}
                code={data.continent.code}
                handleTripGeneration={handleTripGeneration}
                trip={trip}
            />
        </>
    );
};

export default Continent;
