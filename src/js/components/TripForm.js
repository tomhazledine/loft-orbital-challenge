import React, { useEffect } from "react";

import InlineSelect from "./InlineSelect";

const TripOverview = ({ trip, setTrip, countries, reset }) => {
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

    const handleEsc = e => {
        if (e.keyCode === 27) {
            reset();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    return (
        <div className="trip-form">
            <h2 className="prompt__heading">Trip Overview</h2>
            <p>
                Plan a trip within{" "}
                <InlineSelect
                    name="continent"
                    label="Select a continent"
                    id="continent-select"
                    selected={trip.continent}
                    options={{
                        default: "Select a continent",
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
                    id="limit-input"
                    className="form__number form__number--inline"
                    type="number"
                    min="2"
                    max={countries.length}
                    value={trip.limit}
                    onChange={handleLimitChange}
                />{" "}
                cities, starting at{" "}
                <InlineSelect
                    name="city"
                    label="Select a city"
                    id="city-select"
                    selected={trip.start || "default"}
                    options={cityOptions}
                    onChange={handleStartChange}
                />
            </p>
            <button type="button" className="cluster" onClick={reset}>
                <span>Reset</span> <span className="keyboard__hint">ESC</span>
            </button>
        </div>
    );
};

export default TripOverview;
