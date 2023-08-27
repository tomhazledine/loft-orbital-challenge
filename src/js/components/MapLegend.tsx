import React from "react";

type MapLegendProps = {
    main: string;
    secondary?: string;
    position: {
        x?: number;
        y?: number;
    };
};

const MapLegend: React.FC<MapLegendProps> = ({ main, secondary, position }) => (
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
