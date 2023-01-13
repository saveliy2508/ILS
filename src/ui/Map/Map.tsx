import React, {useEffect} from 'react';
import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/types/geometry";
import {geometryClear, getGeometryFetch} from "../../redux/slices/geometrySlice";
import {useAppDispatch} from "../../redux/store";

export const Map = () => {
    const {
        geometry,
        toLat,
        toLng,
        fromLat,
        fromLng,
        toPoint,
        fromPoint
    } = useSelector((state: RootState) => state.geometry)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (toLat && toLng && fromLat && fromLng) {
            dispatch(geometryClear());
            dispatch(getGeometryFetch({fromPoint: [toLat, toLng], toPoint: [fromLat, fromLng]}));
        }
    }, [dispatch, fromLat, fromLng, toLat, toLng]);

    if (!geometry) {
        return null;
    }


    return (
        <MapContainer className='MapContainer' center={fromPoint as LatLngExpression} zoom={12} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={toPoint as LatLngExpression}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
            <Marker position={fromPoint as LatLngExpression}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
            <Polyline pathOptions={{color: 'red'}} positions={geometry as LatLngExpression[]}/>
        </MapContainer>
    );
};
