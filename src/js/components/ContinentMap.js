import React from "react";
import { geoPath, geoGraticule } from "d3-geo";
import { geoLagrange } from "d3-geo-projection";

const ContinentMap = ({ countries, code }) => {
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
        features: countries.map(country => country.shape)
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

    const continentMarkup = (
        <g key={`continent_${code}`} className={`map__continent`}>
            {countries.map(country => {
                const countryData = geoGenerator(country.shape);
                return (
                    <g
                        key={`country_${country.code}`}
                        dataCountry={country.code}
                        className="map__country"
                    >
                        <path
                            className="map__country-shape"
                            d={countryData}
                            clipPath="url(#sphere)"
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
