export type City = {
    coords: number[];
    distance?: number;
    country: string;
};

export type Cities = {
    [key: string]: City;
};
