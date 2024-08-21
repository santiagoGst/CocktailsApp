import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import ContextApp from '../Models/Contexto';
import { IBar } from './IBar';

import L, { latLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import { ICoordenadas } from './ICoordenadas';

export const PrincipalBarComponent = () => {

    const { nombre, rol } = useContext(ContextApp);

    useEffect(() => {
        GetBares();
        obtenerUbicacion();
    }, []
    );

    const [bares, setBares] = useState<IBar[]>([]);

    const GetBares = async () => {
        try {
            const respuesta = await fetch("http://santiag0-001-site1.etempurl.com/Bares");
            const json = await respuesta.json();
            setBares(json);
        } catch (error) {
            alert("prueba 321: " + error);
        }
    }




    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function obtenerUbicacion() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        }
        else {
            alert("El navegador no soporta geolocalizacion");
        }
    }

    function success(posicion: any) {
        coordenadasIniciales.latitud = posicion.coords.latitude;
        coordenadasIniciales.longitud = posicion.coords.longitude;
        setPosicion({ ...coordenadasIniciales, latitud: posicion.coords.latitude });
        setPosicion({ ...coordenadasIniciales, longitud: posicion.coords.longitude });
        // setBar({ ...barInicial, longitud: json.longitud });

        // alert("Latitud: " + posicion.coords.latitude + ", Longitud: " + posicion.coords.longitude);
    }

    function error(e: any) {
        switch (e.code) {
            case e.PERMISSION_DENIED:
                alert("El usuario no autorizó la geolocalización.");
                break;
            case e.POSITION_UNAVAILABLE:
                alert("Ubicación no disponible");
                break
            case e.TIMEOUT:
                alert("Tiempo de espera agotado");
                break
            case e.UNKNOWN_ERROR:
                alert("Error desconocido");
                break
        }
    }




    const coordenadasIniciales: ICoordenadas = {
        latitud: 0,
        longitud: 0
    };
    // const [position, setPosicton]  = [51.505, -0.09];
    // const [posicion, setPosicion] = [19.4310637, -96.7601057];
    const [posicion, setPosicion] = useState<ICoordenadas>(coordenadasIniciales);
    // console.log(posicion);

    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click() {
                console.log("onClick");
                map.locate();
            },
            locationfound(e) {
                // setPosition(e.latlng)
                map.flyTo({ lat: posicion.latitud, lng: posicion.longitud }, map.getZoom())
                console.log("locationFound");
            },
        })

        return posicion === null ? null : (
            <Marker position={{ lat: posicion.latitud, lng: posicion.longitud }}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





    return (
        <>
            <div><h1 className='mb-4'>Bares</h1></div>
            <div className='row mb-4'>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7">

                    <div>
                        <MapContainer center={{ lat: 19.870065050458365, lng: -97.37384522881341 }} zoom={13} scrollWheelZoom={false} >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {bares.map((b, i) => (
                                <>
                                    <Marker position={[b.latitud, b.longitud]}>
                                        <Popup>
                                            {b.nombre}
                                        </Popup>
                                    </Marker>
                                </>
                            ))}
                            <LocationMarker />
                        </MapContainer>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 container">
                </div>



            </div>
            {rol == "admin" ?
                <p className='text-end text-button'>
                    <NavLink className={"btn btn-info mb-1 me-3"} to={'/AgregarBar'}>Agregar Bar +</NavLink>
                </p> :
                <p></p>
            }
            <table className="table table-bordered">
                <thead className='table-dark'>
                    <tr>
                        <th>Nombre Bar</th>
                        <th>Direccion</th>
                        <th>Latitud</th>
                        <th>Longitud</th>
                        {rol == "admin" ?
                            <>
                                <th></th>
                                <th></th>
                            </> :
                            <></>
                        }
                    </tr>
                </thead>
                <tbody>
                    {bares.map((b, i) => (
                        <tr>
                            <td>{b.nombre}</td>
                            <td>{b.direccion}</td>
                            <td>{b.latitud}</td>
                            <td>{b.longitud}</td>
                            {rol == "admin" ?
                                <>
                                    <td><NavLink className={"btn btn-warning"} to={`/ActualizarBar/${b.id}`}>Actualizar</NavLink></td>
                                    <td><NavLink className={"btn btn-danger"} to={`/EliminarBar/${b.id}`}>Eliminar</NavLink></td>
                                </> :
                                <></>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

let DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
});
L.Marker.prototype.options.icon = DefaultIcon;