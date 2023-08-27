import React from "react";

import type { MapLayout } from "./ContinentMap";

type MapDecorationsProps = {
    layout: MapLayout;
    offset?: number;
    size?: number;
};

const MapDecorations: React.FC<MapDecorationsProps> = ({
    layout,
    offset = 2,
    size = 20
}) => (
    <g className="map__decorations">
        <path
            className="map__corner"
            d={`M${offset} ${size + offset}V${offset}H${size + offset}`}
        />
        <path
            className="map__corner"
            d={`M${layout.width - (size + offset)} ${offset}H${
                layout.width - offset
            }V${size + offset}`}
        />
        <path
            className="map__corner"
            d={`M${layout.width - (size + offset)} ${layout.height - offset}H${
                layout.width - offset
            }V${layout.height - (size + offset)}`}
        />
        <path
            className="map__corner"
            d={`M${offset} ${layout.height - (size + offset)}V${
                layout.height - offset
            }H${size + offset}`}
        />
    </g>
);

export default MapDecorations;
