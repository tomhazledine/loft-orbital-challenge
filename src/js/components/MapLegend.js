import React from "react";

const MapLegend = ({ main, secondary, position }) => (
    <div
        className="map__legend"
        style={{
            top: position.y || 0,
            left: position.x || 0
        }}
    >
        <p className="map__legend__continent">{main}</p>
        {secondary && <p className="map__legend__country">{secondary}</p>}
    </div>
);

export default MapLegend;
