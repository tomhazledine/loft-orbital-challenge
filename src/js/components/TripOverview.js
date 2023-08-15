import React, { useEffect } from "react";

import { capitals } from "../data/capitals";

import InlineSelect from "./InlineSelect";

const TripOverview = ({ trip, setTrip }) => {
    // const continent = trip.continent;
    // const limit = trip.limit;
    // const start = trip.start.name;

    // useEffect(() => {
    //     console.log({ trip });
    // }, [trip]);

    const handleContinentChange = e => {
        const newContinent = e.target.value;
        if (newContinent === trip.continent) return;
        setTrip(old => ({ ...old, continent: newContinent.toLowerCase() }));
        // navigate(`/continent/${newContinent.toLowerCase()}`);
    };

    return (
        <div className="trip-overview">
            <h2>Trip Overview</h2>
            <p>
                Plan a trip within{" "}
                <InlineSelect
                    name="continent"
                    label="Select a continent"
                    id="continent-select"
                    selected={trip.continent}
                    options={{
                        af: "Africa",
                        as: "Asia",
                        eu: "Europe",
                        na: "North America",
                        oc: "Oceania",
                        sa: "South America"
                    }}
                    onChange={handleContinentChange}
                />{" "}
                that takes me through <span>{trip.limit}</span> cities, starting
                at{" "}
                <span>
                    {capitals[trip.start]?.properties?.city ||
                        "{select a city}"}
                </span>
            </p>
            {trip.route && (
                <ol>
                    {trip.route.map(point => (
                        <li key={`point_${point.country}`}>
                            {point.capital} ({point.name})
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
};

export default TripOverview;
