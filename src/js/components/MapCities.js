import React from "react";

const MapCities = ({ countries, active, projection }) => {
    const cities = countries.filter(
        country =>
            typeof country.capitalShape !== "undefined" &&
            country.capitalShape &&
            country.capitalShape.properties.city
    );

    const citiesMarkup = cities.map(country => {
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

    return <g className={`map__cities`}>{citiesMarkup}</g>;
};

export default MapCities;
