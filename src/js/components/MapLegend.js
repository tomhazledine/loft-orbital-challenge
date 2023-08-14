import React from "react";

const MapLegend = ({ active, position }) => (
    <>
        {active.continent && (
            <div
                className="map__legend"
                style={{
                    top: position.y || 0,
                    left: position.x || 0
                }}
            >
                <p className="map__legend__continent">{active.continent}</p>
                {active.country && (
                    <p className="map__legend__country">{active.country}</p>
                )}
            </div>
        )}
    </>
);

export default MapLegend;
