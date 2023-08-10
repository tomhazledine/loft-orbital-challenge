import fs from "fs";

import { shapes } from "../src/js/data/raw-shapes.js";
import { countries } from "../src/js/data/countries.js";

// 250 total countries returned by the API, but not all map directly to the raw
// "shapes" data.
//
// `parseShapes()` will simplify the raw shape data and apply aliases (if
// required) to the country names.

// Pre-aliases stats:
// - 165 countries with shapes
// - 85 countries without shapes
// - 12 shapes without countries

// Post-aliases stats:
// - 175 countries with shapes
// - 75 countries without shapes
// - 2 shapes without countries

const parseShapes = shapes => {
    const nameAliases = {
        ["The Bahamas"]: "Bahamas",
        ["French Southern and Antarctic Lands"]: "French Southern Territories",
        ["Guinea Bissau"]: "Guinea-Bissau",
        ["Myanmar"]: "Myanmar [Burma]",
        ["Macedonia"]: "North Macedonia",
        ["West Bank"]: "Palestine",
        ["Republic of Serbia"]: "Serbia",
        ["United Republic of Tanzania"]: "Tanzania",
        ["England"]: "United Kingdom",
        ["USA"]: "United States"
    };

    // Convert the array of shapes into an object keyed by name
    const result = shapes.features.reduce((acc, curr) => {
        const name = nameAliases[curr.properties.name] || curr.properties.name;
        return { ...acc, [name]: curr };
    }, {});

    return result;
};

const parsedShapes = parseShapes(shapes);

// Save the parsed shapes to a file so we can reuse them with the app without having to re-parse them every time.
fs.writeFileSync(
    "./src/js/data/shapes.js",
    `export const shapes = ${JSON.stringify(parsedShapes)}`,
    "utf8"
);

// The rest of this file is just for stats and debugging...

const applyShapes = countries.map(country => ({
    ...country,
    shape: parsedShapes[country.name]
}));

const shapeNames = Object.keys(parsedShapes).sort();

const withShapes = applyShapes
    .filter(country => country.shape)
    .map(country => country.name);

// Find shapeNames that aren't in withShapes
const unmatchedShapes = shapeNames.filter(
    shapeName => !withShapes.includes(shapeName)
);

console.log(`${countries.length} total countries`);
// Log all country names:
// countries
//     .map(country => country.name)
//     .sort()
//     .map(country => console.log(`- ${country}`));
console.log(`---`);
console.log(`${withShapes.length} countries with matching shapes`);
console.log(`---`);
const unmatchedCountries = applyShapes
    .filter(country => !country.shape)
    .map(country => country.name)
    .sort();
console.log(`${unmatchedCountries.length} countries without matching shapes`);
console.log("");
// Log all country names without shapes:
unmatchedCountries.sort().map(country => console.log(`- ${country}`));
console.log(`---`);
// Log all shape names without countries:
console.log(`${unmatchedShapes.length} shapes without matching countries`);
console.log("");
unmatchedShapes.sort().map(country => console.log(`- ${country}`));
