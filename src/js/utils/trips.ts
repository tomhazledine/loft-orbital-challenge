import type { City, Cities, Country } from "./trips.types";

/**
 * Returns a list of cities with their country code as the key
 *
 * @param countries - list of countries
 * @returns list of cities
 */
export const parseCountriesToCities = (countries: Country[]): Cities =>
    countries
        .filter(country => country.capitalShape)
        .map(country => ({
            country: country.code,
            name: country.name,
            capital: country.capital,
            coords: country.capitalShape.geometry.coordinates
        }))
        .reduce((acc, curr) => ({ ...acc, [curr.country]: curr }), {});

/**
 * Calculates the distance between two points
 *
 * @param start - starting point coordinates (x, y)
 * @param end - ending point coordinates (x, y)
 * @returns distance between two points
 */
export const calculateDistance = (start: number[], end: number[]) =>
    parseFloat(
        Math.sqrt(
            Math.pow(start[0] - end[0], 2) + Math.pow(start[1] - end[1], 2)
        ).toFixed(4)
    );

/**
 * Finds the closest city to a given city
 *
 * @param start - starting city
 * @param others - list of other cities
 * @returns closest city
 */
export const findClosestCoords = (start: City, others: Cities) => {
    const distances = Object.values(others)
        .map(city => {
            const distance = calculateDistance(start.coords, city.coords);
            return { ...city, distance };
        })
        .sort((a, b) => a.distance - b.distance);
    return distances[0];
};

/**
 * Finds the closest cities to a given city
 *
 * @param start - starting city
 * @param others - list of other cities
 * @param previous - list of previous cities
 * @returns list of closest cities
 */
export const findClosestCities = (
    start: City,
    others: Cities,
    previous: string[] = [start.country]
) => {
    if (Object.keys(others).length <= 1) {
        return [...previous, Object.keys(others)[0]];
    }
    const closest = findClosestCoords(start, others);
    const ongoing = [...previous, closest.country];
    const { [closest.country]: next, ...rest } = others;
    return findClosestCities(next, rest, ongoing);
};

/**
 * Calculates the trip
 *
 * @param start - starting city
 * @param countries - list of countries
 * @returns list of cities in order
 */
export const calculateTrip = (start: string, countries: Country[]) => {
    const parsedCountries = parseCountriesToCities(countries);
    const { [start]: startCity, ...otherCities } = parsedCountries;

    const order = findClosestCities(startCity, otherCities);
    return order.map(country => parsedCountries[country]);
};
