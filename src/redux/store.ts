import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";
import geometrySlice from "./slices/geometrySlice";
import {useDispatch} from "react-redux";
import geometrySaga from "./sagas/geometrySaga";
import {AppDispatch} from "./types/geometry";

export const saga = createSagaMiddleware();
const store = configureStore({
    reducer: {
        geometry: geometrySlice,
    },
    middleware: [saga]
});
saga.run(geometrySaga)

export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;




