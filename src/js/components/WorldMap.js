import React, { useEffect, useRef, useState } from "react";
import { geoPath, geoGraticule } from "d3-geo";
import { geoPolyhedralWaterman } from "d3-geo-projection";
import { useNavigate } from "react-router-dom";

import { shapes } from "../data/shapes";
import MapLegend from "./MapLegend";
import MapDecorations from "./MapDecorations";

const WorldMap = ({ continents }) => {
    const navigate = useNavigate();
    const [active, setActive] = useState({ continent: false, country: false });
    const wrapperRef = useRef(null);
    const [legendPosition, setLegendPosition] = useState({ x: null, y: null });

    const layout = {
        width: 1400,
        height: 680,
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    };

    const projection = geoPolyhedralWaterman().fitSize(
        [layout.width, layout.height],
        { type: "Sphere" }
    );
    const geoGenerator = geoPath().projection(projection);

    const graticuleGenerator = geoGraticule();
    const graticules = graticuleGenerator();
    const graticuleData = geoGenerator(graticules);

    const sphereData = geoGenerator({ type: "Sphere" });

    const handleHover = (continent, country) => {
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

    const handleMouseMove = e => {
        const bounds = wrapperRef.current.getBoundingClientRect();
        const buffer = 10;
        setLegendPosition({
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top + buffer
        });
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
            onMouseMove={handleMouseMove}
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
        <div className="map__wrapper" ref={wrapperRef}>
            <svg
                className="map"
                // viewBox={`35 0 890 500`}
                viewBox={`0 0 ${layout.width} ${layout.height}`}
                preserveAspectRatio="none"
                // onMouseMove={handleMouseMove}
            >
                <MapDecorations layout={layout} />
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
            {active.continent && (
                <MapLegend
                    main={active.continent}
                    secondary={active.country}
                    position={legendPosition}
                />
            )}
        </div>
    );
};

export default WorldMap;
