import React from "react";

const MapRoute = ({ projection, trip }) => {
    const route = trip.route
        .map((point, index) => {
            const pointData = projection(point.coords);
            const nextPoint = trip.route[index + 1];
            if (!nextPoint) {
                return false;
            }
            const nextPointData = projection(nextPoint.coords);
            return {
                ...point,
                pointData,
                nextPointData
            };
        })
        .filter(point => point);

    return (
        <g className="map__trip">
            {route.map(point => (
                <line
                    key={`trip-point-${point.country}`}
                    className={`map__trip-line--emphasis`}
                    x1={point.pointData[0]}
                    y1={point.pointData[1]}
                    x2={point.nextPointData[0]}
                    y2={point.nextPointData[1]}
                />
            ))}
            {route.map(point => (
                <line
                    key={`trip-point-${point.country}`}
                    className={`map__trip-line`}
                    x1={point.pointData[0]}
                    y1={point.pointData[1]}
                    x2={point.nextPointData[0]}
                    y2={point.nextPointData[1]}
                />
            ))}
            ;
        </g>
    );
};

export default MapRoute;
