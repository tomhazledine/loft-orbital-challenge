export type Country = {
    code: string;
    name: string;
    capital: string;
    shape?: {
        geometry: {
            coordinates: number[];
        };
    };
    capitalShape?: {
        geometry: {
            coordinates: number[];
        };
    };
};

export type City = {
    coords: number[];
    distance?: number;
    country: string;
};

export type Cities = {
    [key: string]: City;
};

export type Trip = {
    start: string | undefined;
    continent: string | undefined;
    limit: number;
    route: Cities[];
};
