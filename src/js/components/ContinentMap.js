import React, { useRef, useState } from "react";
import { geoPath, geoGraticule } from "d3-geo";
import { geoLagrange } from "d3-geo-projection";

import MapDecorations from "./MapDecorations";
import MapLegend from "./MapLegend";
import MapRoute from "./MapRoute";

const ContinentMap = ({ countries, code, handleTripGeneration, trip }) => {
    const [active, setActive] = useState(false);
    const wrapperRef = useRef(null);
    const [legendPosition, setLegendPosition] = useState({ x: null, y: null });

    const layout = {
        width: 1000,
        height: 680,
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    };

    const continentFeature = {
        type: "FeatureCollection",
        features: countries
            .filter(country => country.name !== "Russia")
            .filter(country => country.name !== "Fiji")
            .filter(country => country.name !== "Norway")
            .map(country => country.shape)
    };

    const projection = geoLagrange().fitSize(
        [layout.width, layout.height],
        continentFeature
    );
    const geoGenerator = geoPath().projection(projection);

    const graticuleGenerator = geoGraticule();
    const graticules = graticuleGenerator();
    const graticuleData = geoGenerator(graticules);

    const sphereData = geoGenerator({ type: "Sphere" });

    const handleCapitalClick = capital => {
        handleTripGeneration(capital.id);
    };
    const handleCountryClick = country => {
        handleTripGeneration(country);
    };

    const handleFocus = country => {
        setActive(country);
    };
    const handleHover = country => {
        setActive(country);
    };

    const handleMouseMove = e => {
        const bounds = wrapperRef.current.getBoundingClientRect();
        const buffer = 10;
        setLegendPosition({
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top + buffer
        });
    };

    const countriesMarkup = countries.map(country => {
        const countryData = geoGenerator(country.shape);
        return (
            <g
                key={`country_${country.code}`}
                data-country={country.code}
                className={`map__country`}
                onMouseMove={handleMouseMove}
            >
                <path
                    // tabIndex="0"
                    onFocus={() => handleFocus(country)}
                    onMouseOver={() => handleHover(country)}
                    onClick={() => handleCountryClick(country.code)}
                    // onMouseMove={handleMouseMove}
                    className={`map__country-shape ${
                        country.code === active.code
                            ? "map__country-shape--active"
                            : ""
                    }`}
                    d={countryData}
                    clipPath="url(#sphere)"
                />
            </g>
        );
    });

    const citiesMarkup = countries
        .filter(
            country =>
                typeof country.capitalShape !== "undefined" &&
                country.capitalShape &&
                country.capitalShape.properties.city
        )
        .map(country => {
            const countryCapital = projection(
                country.capitalShape.geometry.coordinates
            );
            return (
                <g
                    key={`capital_${country.code}_${country.capitalShape.city}`}
                    data-country={country.code}
                    data-capital={country.capitalShape.properties.city}
                >
                    {active.code === country.code && (
                        <circle
                            className="map__capital--active"
                            pointerEvents="all"
                            cx={countryCapital[0]}
                            cy={countryCapital[1]}
                            r="10"
                            onClick={() =>
                                handleCapitalClick(country.capitalShape)
                            }
                        />
                    )}
                    <circle
                        className="map__capital"
                        cx={countryCapital[0]}
                        cy={countryCapital[1]}
                        r="5"
                    />
                </g>
            );
        });

    return (
        <div className="map__wrapper" ref={wrapperRef}>
            <svg
                className="map"
                viewBox={`0 0 ${layout.width} ${layout.height}`}
                preserveAspectRatio="none"
            >
                <clipPath id="sphere">
                    <path d={sphereData} />
                </clipPath>
                <path
                    className="map__graticules"
                    d={graticuleData}
                    clipPath="url(#sphere)"
                />
                <g key={`continent_${code}`} className={`map__continent`}>
                    {countriesMarkup}
                    {trip.route && (
                        <MapRoute trip={trip} projection={projection} />
                    )}
                    {citiesMarkup}
                </g>
                <MapDecorations layout={layout} />
            </svg>
            {active && (
                <MapLegend
                    main={active.capital}
                    secondary={`(${active.name})`}
                    position={legendPosition}
                />
            )}
        </div>
    );
};

export default ContinentMap;
