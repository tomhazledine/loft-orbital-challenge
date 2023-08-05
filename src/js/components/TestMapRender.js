import React from "react";
import { geoEqualEarth, geoPath, geoGraticule } from "d3-geo";

import { shapes } from "../data/shapes";

const TestMapRender = ({ country }) => {
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

    const countryFeature = shapes[country.name];

    const projection = geoEqualEarth();
    const geoGenerator = geoPath().projection(projection);

    const graticuleGenerator = geoGraticule();
    const graticules = graticuleGenerator();
    const graticuleData = geoGenerator(graticules);

    const pathData = geoGenerator(countryFeature);
    console.log({ pathData });
    console.log({ graticuleData });

    return (
        <svg
            className="country-map"
            viewBox={`0 0 ${map.layout.width} ${
                map.layout.height + map.layout.margin.bottom
            }`}
            preserveAspectRatio="none"
        >
            <path className="graticules" d={graticuleData} />
            <path className="country-shape" d={pathData} />
        </svg>
    );
};

export default TestMapRender;
