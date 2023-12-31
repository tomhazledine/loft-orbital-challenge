export const parseCountriesToCities = countries =>
    countries
        .filter(country => country.capitalShape)
        .map(country => ({
            country: country.code,
            name: country.name,
            capital: country.capital,
            coords: country.capitalShape.geometry.coordinates
        }))
        .reduce((acc, curr) => ({ ...acc, [curr.country]: curr }), {});

export const calculateDistance = (start, end) =>
    parseFloat(
        Math.sqrt(
            Math.pow(start[0] - end[0], 2) + Math.pow(start[1] - end[1], 2)
        ).toFixed(4),
        10
    );

export const findClosestCoords = (start, others) => {
    const distances = Object.values(others)
        .map(city => {
            const distance = calculateDistance(start.coords, city.coords);
            return { ...city, distance };
        })
        .sort((a, b) => a.distance - b.distance);
    return distances[0];
};

export const findClosestCities = (
    start,
    others,
    previous = [start.country]
) => {
    if (Object.keys(others).length <= 1) {
        return [...previous, Object.keys(others)[0]];
    }
    const closest = findClosestCoords(start, others);
    const ongoing = [...previous, closest.country];
    const { [closest.country]: next, ...rest } = others;
    return findClosestCities(next, rest, ongoing);
};

export const calculateTrip = (start, countries) => {
    const parsedCountries = parseCountriesToCities(countries);
    const { [start]: startCity, ...otherCities } = parsedCountries;

    const order = findClosestCities(startCity, otherCities);
    return order.map(country => parsedCountries[country]);
};
