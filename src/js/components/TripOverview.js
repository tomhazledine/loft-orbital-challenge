import React from "react";

const TripOverview = ({ trip }) => {
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
