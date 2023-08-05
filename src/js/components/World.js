import React from "react";
import { geoEqualEarth, geoPath, geoGraticule } from "d3-geo";

import { shapes } from "../data/shapes";

const World = ({ continents }) => {
    const map = {
        layout: {
            width: 1000,
            height: 500,
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        }
    };

    const projection = geoEqualEarth();
    const geoGenerator = geoPath().projection(projection);

    const graticuleGenerator = geoGraticule();
    const graticules = graticuleGenerator();
    const graticuleData = geoGenerator(graticules);

    const continentMarkup = continents.map(continent => (
        <g key={`continent_${continent.code}`}>
            {continent.countries.map(country => {
                console.log({ country });
                const countryFeature = shapes[country.name];
                if (!countryFeature) return null;
                const countryData = geoGenerator(countryFeature);
                return (
                    <g key={`country_${country.code}`}>
                        <path className="country-shape" d={countryData} />
                    </g>
                );
            })}
        </g>
    ));

    return (
        <svg
            className="country-map"
            viewBox={`0 0 ${map.layout.width} ${map.layout.height}`}
            preserveAspectRatio="none"
        >
            <path className="graticules" d={graticuleData} />
            {continentMarkup}
        </svg>
    );
};

export default World;
