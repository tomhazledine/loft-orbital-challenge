import React, { useRef, useState } from "react";
import { geoPath, geoGraticule } from "d3-geo";
import { geoPolyhedralWaterman } from "d3-geo-projection";

import { shapes } from "../data/shapes";

const World = ({ continents }) => {
    const [active, setActive] = useState({ continent: false, country: false });
    const wrapperRef = useRef(null);

    const projection = geoPolyhedralWaterman();
    const geoGenerator = geoPath().projection(projection);

    const graticuleGenerator = geoGraticule();
    const graticules = graticuleGenerator();
    const graticuleData = geoGenerator(graticules);

    const sphereData = geoGenerator({ type: "Sphere" });

    const handleHover = (continent, country) => {
        console.log({ continent, country });
        setActive({ continent: continent.name, country: country.name });
    };

    const handleReset = () => {
        setActive({ continent: false, country: false });
    };

    const continentMarkup = continents.map(continent => (
        <g
            key={`continent_${continent.code}`}
            className={`map__continent ${
                active.continent === continent.name
                    ? "map__continent--active"
                    : ""
            }`}
        >
            {continent.countries.map(country => {
                const countryFeature = shapes[country.name];
                if (!countryFeature) return null;
                const countryData = geoGenerator(countryFeature);
                return (
                    <g key={`country_${country.code}`} className="map__country">
                        <path
                            className="map__country-shape"
                            d={countryData}
                            clipPath="url(#sphere)"
                            onMouseOver={e => handleHover(continent, country)}
                        />
                    </g>
                );
            })}
        </g>
    ));

    return (
        <div className="map__wrapper">
            {active.continent && (
                <div className="map__legend">
                    <p>continent: {active.continent}</p>
                    {active.country && <p>country: {active.country}</p>}
                </div>
            )}
            <svg
                ref={wrapperRef}
                className="map"
                viewBox={`45 0 870 500`}
                preserveAspectRatio="none"
            >
                <clipPath id="sphere">
                    <path d={sphereData} />
                </clipPath>
                <path
                    className="map__border"
                    d={sphereData}
                    onMouseLeave={handleReset}
                />
                <path
                    className="map__graticules"
                    d={graticuleData}
                    clipPath="url(#sphere)"
                />
                {continentMarkup}
            </svg>
        </div>
    );
};

export default World;
