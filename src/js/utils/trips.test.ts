import * as trips from "./trips";

describe("Trip functions", () => {
    test("parseCountriesToCities turns an array of countries into an object with city values keyed by country code", () => {
        const countries = [
            {
                code: "US",
                name: "United States",
                capital: "Washington",
                capitalShape: {
                    geometry: {
                        coordinates: [1, 2]
                    }
                }
            },
            {
                code: "CA",
                name: "Canada",
                capital: "Ottawa",
                capitalShape: {
                    geometry: {
                        coordinates: [3, 4]
                    }
                }
            }
        ];

        const expected = {
            US: {
                country: "US",
                name: "United States",
                capital: "Washington",
                coords: [1, 2]
            },
            CA: {
                country: "CA",
                name: "Canada",
                capital: "Ottawa",
                coords: [3, 4]
            }
        };

        expect(trips.parseCountriesToCities(countries)).toEqual(expected);
    });

    test("calculateDistance calculates the distance between two points", () => {
        const start = [1, 1];
        const end = [4, 5];
        const expected = 5;
        expect(trips.calculateDistance(start, end)).toEqual(expected);
    });

    test("findClosestCoords finds the closest city to a given city", () => {
        const start = {
            country: "US",
            name: "United States",
            capital: "Washington",
            coords: [-77.02, 38.53]
        };
        const others = {
            CA: {
                country: "CA",
                name: "Canada",
                capital: "Ottawa",
                coords: [-75.42, 45.25]
            },
            MX: {
                country: "MX",
                name: "Mexico",
                capital: "Mexico City",
                coords: [-99.08, 19.26]
            }
        };
        const expected = {
            country: "CA",
            name: "Canada",
            capital: "Ottawa",
            coords: [-75.42, 45.25],
            distance: 6.9079
        };
        expect(trips.findClosestCoords(start, others)).toEqual(expected);
    });

    test("findClosestCities finds the closest cities to a given city", () => {
        const start = {
            country: "US",
            name: "United States",
            capital: "Washington",
            coords: [-77.02, 38.53]
        };
        const others = {
            CA: {
                country: "CA",
                name: "Canada",
                capital: "Ottawa",
                coords: [-75.42, 45.25]
            },
            MX: {
                country: "MX",
                name: "Mexico",
                capital: "Mexico City",
                coords: [-99.08, 19.26]
            },
            GB: {
                country: "GB",
                name: "United Kingdom",
                capital: "London",
                coords: [-0.11, 51.3]
            }
        };
        const expected = ["US", "CA", "MX", "GB"];
        expect(trips.findClosestCities(start, others)).toEqual(expected);
    });

    test("calculateTrip calculates the trip", () => {
        const start = "US";
        const countries = [
            {
                code: "US",
                name: "United States",
                capital: "Washington",
                capitalShape: {
                    geometry: {
                        coordinates: [-77.02, 38.53]
                    }
                }
            },
            {
                code: "CA",
                name: "Canada",
                capital: "Ottawa",
                capitalShape: {
                    geometry: {
                        coordinates: [-75.42, 45.25]
                    }
                }
            },
            {
                code: "MX",
                name: "Mexico",
                capital: "Mexico City",
                capitalShape: {
                    geometry: {
                        coordinates: [-99.08, 19.26]
                    }
                }
            },
            {
                code: "GB",
                name: "United Kingdom",
                capital: "London",
                capitalShape: {
                    geometry: {
                        coordinates: [-0.11, 51.3]
                    }
                }
            }
        ];
        const expected = [
            {
                country: "US",
                name: "United States",
                capital: "Washington",
                coords: [-77.02, 38.53]
            },
            {
                country: "CA",
                name: "Canada",
                capital: "Ottawa",
                coords: [-75.42, 45.25]
            },
            {
                country: "MX",
                name: "Mexico",
                capital: "Mexico City",
                coords: [-99.08, 19.26]
            },
            {
                country: "GB",
                name: "United Kingdom",
                capital: "London",
                coords: [-0.11, 51.3]
            }
        ];
        expect(trips.calculateTrip(start, countries)).toEqual(expected);
    });
});
