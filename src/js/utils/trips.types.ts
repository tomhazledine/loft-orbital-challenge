export type Country = {
    code: string;
    name: string;
    capital: string;
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
