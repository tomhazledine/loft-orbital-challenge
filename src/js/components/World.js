import React, { useEffect, useRef, useState } from "react";
import { geoPath, geoGraticule } from "d3-geo";
import { geoPolyhedralWaterman } from "d3-geo-projection";
import { useNavigate } from "react-router-dom";

import { shapes } from "../data/shapes";

const World = ({ continents }) => {
    const navigate = useNavigate();
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

    const handleSelection = continent => {
        navigate(`/continent/${continent.code.toLowerCase()}`);
    };

    const handleFocus = continent => {
        setActive({ continent: continent.name, country: false });
    };

    const handleReset = () => {
        setActive({ continent: false, country: false });
    };

    const handleEsc = e => {
        if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
            if (e.keyCode === 27) {
                handleReset();
            }
        }
    };

    const handleClickOutside = e => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            handleReset();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    const continentMarkup = continents.map(continent => (
        <g
            key={`continent_${continent.code}`}
            className={`map__continent ${
                active.continent === continent.name
                    ? "map__continent--active"
                    : ""
            }`}
            tabIndex="0"
            onFocus={() => handleFocus(continent)}
            onClick={() => handleSelection(continent)}
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
                            onMouseOver={() => handleHover(continent, country)}
                            onClick={() => handleSelection(continent)}
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
                viewBox={`35 0 890 500`}
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
