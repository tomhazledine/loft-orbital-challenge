import React from "react";

import InlineSelect from "./InlineSelect";

const TripOverview = ({ trip, setTrip, countries }) => {
    const handleContinentChange = e => {
        const newContinent = e.target.value;
        if (newContinent === trip.continent) return;
        setTrip(old => ({ ...old, continent: newContinent.toLowerCase() }));
    };

    const handleLimitChange = e => {
        const newLimit = e.target.value;
        setTrip(old => ({ ...old, limit: parseInt(newLimit, 10) }));
    };

    const handleStartChange = e => {
        const newStart = e.target.value;
        setTrip(old => ({ ...old, start: newStart }));
    };

    const cityOptions = countries.reduce(
        (acc, country) => {
            return { ...acc, [country.code]: country.capital };
        },
        { default: "Select a city" }
    );

    return (
        <div className="trip-overview">
            <h2 className="prompt__heading">Trip Overview</h2>
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
                that takes me through{" "}
                <input
                    className="form__number form__number--inline"
                    type="number"
                    min="2"
                    max={countries.length}
                    value={trip.limit}
                    onChange={handleLimitChange}
                />{" "}
                cities, starting at{" "}
                <InlineSelect
                    name="continent"
                    label="Select a continent"
                    id="continent-select"
                    selected={trip.start || "default"}
                    options={cityOptions}
                    onChange={handleStartChange}
                />
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
