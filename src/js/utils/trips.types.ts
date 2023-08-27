export type Continent = {
    code: string;
    name: string;
    countries: Country[];
};

export type Country = {
    code: string;
    name: string;
    capital: string;
    shape?: {
        geometry: {
            coordinates: [number, number];
        };
    };
    capitalShape?: {
        properties: {
            city: string;
        };
        geometry: {
            coordinates: [number, number];
        };
    };
};

export type City = {
    coords: [number, number];
    distance?: number;
    country: string;
    capital: string;
    name: string;
};

export type Cities = {
    [key: string]: City;
};

export type Trip = {
    start: string | undefined;
    continent: string | undefined;
    limit: number;
    route: City[];
};
