import store from "../store";

export type Coordinate = [number, number]

export type GeometryState = {
    error?: string;
    geometry?: Coordinate[];
    fromLat?: number;
    fromLng?: number;
    toLat?: number;
    toLng?: number;
    fromPoint?: Coordinate;
    toPoint?: Coordinate;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;