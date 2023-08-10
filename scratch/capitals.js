import fs from "fs";

import { capitals } from "../src/js/data/raw-capitals.js";
console.log({ x: capitals.features });

const parseCapitals = capitals => {
    return capitals.features.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: curr }),
        {}
    );
};

const parsedCapitals = parseCapitals(capitals);

// Save the parsed shapes to a file so we can reuse them with the app without having to re-parse them every time.
fs.writeFileSync(
    "./src/js/data/capitals.js",
    `export const capitals = ${JSON.stringify(parsedCapitals)}`,
    "utf8"
);
