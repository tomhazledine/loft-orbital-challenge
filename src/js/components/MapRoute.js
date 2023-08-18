import React from "react";

const MapRoute = ({ projection, trip }) => {
    const route = trip.route.map((point, index) => {
        const pointData = projection(point.coords);
        const nextPoint = trip.route[index + 1];
        if (!nextPoint) {
            return { ...point, pointData };
        }
        const nextPointData = projection(nextPoint.coords);
        return {
            ...point,
            pointData,
            nextPointData
        };
    });

    return (
        <g className="map__trip">
            <defs>
                <filter x="0" y="0" width="1" height="1" id="solid">
                    <feFlood floodColor="#005b42" result="bg" />
                    <feMerge>
                        <feMergeNode in="bg" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {route
                .filter(point => point.nextPointData)
                .map(point => (
                    <line
                        key={`trip-point-${point.country}`}
                        className={`map__trip-line--emphasis`}
                        x1={point.pointData[0]}
                        y1={point.pointData[1]}
                        x2={point.nextPointData[0]}
                        y2={point.nextPointData[1]}
                    />
                ))}
            {route
                .filter(point => point.nextPointData)
                .map(point => (
                    <line
                        key={`trip-point-${point.country}`}
                        className={`map__trip-line`}
                        x1={point.pointData[0]}
                        y1={point.pointData[1]}
                        x2={point.nextPointData[0]}
                        y2={point.nextPointData[1]}
                    />
                ))}
            {route.map((point, i) => {
                if (i !== 0 && i !== route.length - 1) {
                    return null;
                }
                return (
                    <g key={`trip-point-${point.country}`}>
                        <circle
                            className="map__trip-label-bg"
                            cx={point.pointData[0]}
                            cy={point.pointData[1] - 20}
                            r="10"
                        />
                        <text
                            x={point.pointData[0]}
                            y={point.pointData[1] - 20}
                            className="map__trip-label"
                        >
                            {i + 1}
                        </text>
                        <text
                            filter="url(#solid)"
                            x={point.pointData[0] + 20}
                            y={point.pointData[1] - 20}
                            className="map__trip-label--name"
                        >
                            {point.capital}
                        </text>
                    </g>
                );
            })}
            ;
        </g>
    );
};

export default MapRoute;
