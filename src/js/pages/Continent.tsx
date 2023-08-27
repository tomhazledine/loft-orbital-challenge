import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { shapes } from "../data/shapes";
import { capitals } from "../data/capitals";
import { calculateTrip } from "../utils/trips";

import ContinentMap from "../components/ContinentMap";
import TripForm from "../components/TripForm";
import TripOverview from "../components/TripOverview";

import type { Trip } from "../utils/trips.types";

const RAW_TRIP = {
    start: undefined,
    continent: undefined,
    limit: 8,
    route: []
};

const Continent: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [trip, setTrip] = useState((): Trip => RAW_TRIP);

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
            setTrip(old => ({
                ...old,
                continent: data.continent.code.toLowerCase()
            }));
        }
    }, [data]);

    const countries = (data?.continent?.countries || [])
        .map(country => {
            const shape = shapes[country.name];
            if (!shape) return false;
            const capital = capitals[country.code];
            return { ...country, shape, capitalShape: capital };
        })
        .filter(country => country);

    const handleTripGeneration = (startCapital: string) => {
        console.log(`Calculating trip for ${startCapital}`);
        const trip = calculateTrip(startCapital, countries);
        setTrip(old => ({
            ...old,
            start: startCapital,
            route: trip.slice(0, old.limit)
        }));
    };

    const handleReset = () => {
        setTrip({ ...RAW_TRIP, continent: params.continent });
    };

    useEffect(() => {
        if (trip.continent && trip.continent !== params.continent) {
            navigate(`/continent/${trip.continent}`);
            return;
        }
        if (
            trip.continent &&
            typeof trip.start === "string" &&
            !countries.find(country => country.code === trip.start)
        ) {
            setTrip(old => ({ ...old, start: undefined, route: [] }));
            return;
        }
        if (trip.continent && trip.limit > countries.length) {
            setTrip(old => ({ ...old, limit: countries.length }));
            return;
        }

        if (
            trip.continent &&
            typeof trip.start === "string" &&
            trip.route &&
            trip.route.length &&
            trip.route.length !== trip.limit
        ) {
            handleTripGeneration(trip.start);
            return;
        }
    }, [trip]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (!data.continent) return <p>Error : continent not found</p>;

    return (
        <div className="stack">
            <TripForm
                trip={trip}
                setTrip={setTrip}
                countries={countries}
                reset={handleReset}
            />
            <div className="continent-map-container">
                <ContinentMap
                    countries={countries}
                    code={data.continent.code}
                    handleTripGeneration={handleTripGeneration}
                    trip={trip}
                />
                {trip.route.length > 0 && <TripOverview trip={trip} />}
            </div>
        </div>
    );
};

export default Continent;
