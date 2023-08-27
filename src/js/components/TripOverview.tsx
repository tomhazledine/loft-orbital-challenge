import React from "react";

import type { Trip } from "../utils/trips.types";

const TripOverview: React.FC<{ trip: Trip }> = ({ trip }) => {
    return (
        <ol className="trip-overview">
            {trip.route.map(point => (
                <li key={`point_${point.country}`}>
                    {point.capital} ({point.name})
                </li>
            ))}
        </ol>
    );
};

export default TripOverview;
