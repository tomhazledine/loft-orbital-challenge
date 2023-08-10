import React, { useEffect } from "react";

import { capitals } from "../data/capitals";

const TripOverview = ({ trip }) => {
    // const continent = trip.continent;
    // const limit = trip.limit;
    // const start = trip.start.name;

    // useEffect(() => {
    //     console.log({ trip });
    // }, [trip]);

    return (
        <div className="trip-overview">
            <h2>Trip Overview</h2>
            <p>
                Plan a trip within <span>{trip.continent}</span> that takes me
                through <span>{trip.limit}</span> cities, starting at{" "}
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
