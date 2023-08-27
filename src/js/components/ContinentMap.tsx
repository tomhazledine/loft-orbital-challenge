import React, { useRef, useState } from "react";
import { geoPath, geoGraticule } from "d3-geo";
import { geoLagrange } from "d3-geo-projection";

import MapDecorations from "./MapDecorations";
import MapLegend from "./MapLegend";
import MapRoute from "./MapRoute";
import MapCities from "./MapCities";

import type { Country, Trip } from "../utils/trips.types";

type ContinentMapProps = {
    countries: Country[];
    code: string;
    handleTripGeneration: (startCapital: string) => void;
    trip: Trip;
};

const ContinentMap: React.FC<ContinentMapProps> = ({
    countries,
    code,
    handleTripGeneration,
    trip
}) => {
    const [active, setActive] = useState((): Country | undefined => undefined);
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
            .filter(country => country.name !== "Russia") // Russia throws off the cropping for the "useful" parts of Europe (i.e. the parts with where the capitals are located).
            .filter(country => country.name !== "Fiji") // Fiji crosses the international date line, which causes problems with the cropping.
            .filter(country => country.name !== "Norway") // Norway includes Svalbard, which is way up north and throws off the cropping.
            .map(country => country.shape)
    };
    console.log({ countries, continentFeature });

    const projection = geoLagrange().fitSize(
        [layout.width, layout.height],
        continentFeature
    );
    const geoGenerator = geoPath().projection(projection);

    const graticuleGenerator = geoGraticule();
    const graticules = graticuleGenerator();
    const graticuleData = geoGenerator(graticules);

    const sphereData = geoGenerator({ type: "Sphere" });

    const handleCountryClick = country => {
        handleTripGeneration(country);
    };

    const handleFocus = country => {
        setActive(country);
    };
    const handleHover = country => {
        setActive(country);
    };

    const handleReset = () => {
        setActive(undefined);
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
                    onFocus={() => handleFocus(country)}
                    onMouseOver={() => handleHover(country)}
                    onClick={() => handleCountryClick(country.code)}
                    onMouseLeave={handleReset}
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
                    <MapCities
                        active={active}
                        countries={countries}
                        projection={projection}
                    />
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
