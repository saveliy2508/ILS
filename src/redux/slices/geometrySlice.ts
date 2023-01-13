import {createSlice} from '@reduxjs/toolkit';
import {GeometryState} from "../types/geometry";

const initialState: GeometryState = {
    error: undefined,
    geometry: undefined,
    fromLat: undefined,
    fromLng: undefined,
    toLat: undefined,
    toLng: undefined,
    fromPoint: undefined,
    toPoint: undefined,
}

const geometrySlice = createSlice({
    name: 'geometry',
    initialState,
    reducers: {
        getGeometryFetch: (coordinates) => {
            return coordinates;
        },
        getGeometrySuccess: (state, {payload}) => {
            state.geometry = payload.routes[0].geometry.coordinates;
            state.fromPoint = payload.waypoints[0].location
            state.toPoint = payload.waypoints[1].location
        },
        getGeometryFailure: (state, action) => {
            state.error = action.payload;
        },
        geometryClear: (state) => {
            state.geometry = undefined;
        },
        setPoints: (state, action) => {
            state.fromLat = action.payload[0];
            state.fromLng = action.payload[1];
            state.toLat = action.payload[2];
            state.toLng = action.payload[3];
        }
    },
});

export const {
    getGeometryFetch,
    geometryClear,
    getGeometrySuccess,
    getGeometryFailure,
    setPoints
} = geometrySlice.actions;

export default geometrySlice.reducer;