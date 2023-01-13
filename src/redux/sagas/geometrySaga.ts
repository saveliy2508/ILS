import {takeEvery, put, call} from 'redux-saga/effects';
import {getGeometryFailure, getGeometrySuccess} from "../slices/geometrySlice";
import {Coordinate} from "../types/geometry";
import {PayloadAction} from "@reduxjs/toolkit";

export const geometryFetch = async (coordinates: { fromPoint: Coordinate[], toPoint: Coordinate[] }) => {
    const coordinatesToString = `${coordinates.fromPoint[0]},${coordinates.fromPoint[1]};${coordinates.toPoint[0]},${coordinates.toPoint[1]}`;
    return fetch(`http://router.project-osrm.org/route/v1/driving/${coordinatesToString}?geometries=geojson`);
}

function* workGetGeometryFetch(action: PayloadAction<{}>) {
    try {
        console.log(action.payload)
        //@ts-ignore
        const geometry = yield call(geometryFetch, action.payload);
        //@ts-ignore
        const formattedGeometry = yield geometry.json();
        yield put(getGeometrySuccess(formattedGeometry));
    } catch (err) {
        yield put(getGeometryFailure(err));
    }
}

function* geometrySaga() {
    yield takeEvery('geometry/getGeometryFetch', workGetGeometryFetch);
}

export default geometrySaga;