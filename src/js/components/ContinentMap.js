import React from "react";
import { geoPath, geoGraticule } from "d3-geo";
import { geoLagrange } from "d3-geo-projection";

const ContinentMap = ({ countries, code, handleTripGeneration }) => {
    const layout = {
        width: 1460,
        height: 800,
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
        console.log(
            `${capital.properties.city} (${capital.properties.country})`
        );
        handleTripGeneration(capital.id);
    };

    const continentMarkup = (
        <g key={`continent_${code}`} className={`map__continent`}>
            {countries.map(country => {
                const countryData = geoGenerator(country.shape);
                return (
                    <g
                        key={`country_${country.code}`}
                        data-country={country.code}
                        className="map__country"
                    >
                        <path
                            className="map__country-shape map__country-shape--static"
                            d={countryData}
                            clipPath="url(#sphere)"
                        />
                    </g>
                );
            })}
            {countries
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
                            <circle
                                className="map__capital"
                                cx={countryCapital[0]}
                                cy={countryCapital[1]}
                                r="5"
                            />
                            <circle
                                className="map__capital--hitbox"
                                pointerEvents="all"
                                cx={countryCapital[0]}
                                cy={countryCapital[1]}
                                r="30"
                                onClick={() =>
                                    handleCapitalClick(country.capitalShape)
                                }
                            />
                        </g>
                    );
                })}
        </g>
    );

    return (
        <div className="map__wrapper">
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
                {continentMarkup}
            </svg>
        </div>
    );
};

export default ContinentMap;
