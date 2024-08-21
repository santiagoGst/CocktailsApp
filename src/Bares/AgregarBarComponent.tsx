import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { IBar } from './IBar';
import * as Yup from 'yup'
import { ErrorMessage, Form, Formik } from 'formik';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { ICoordenadas } from './ICoordenadas';
import L, { popup } from 'leaflet';


export const AgregarBarComponent = () => {

    const navegacion = useNavigate();

    useEffect(() => {
        obtenerUbicacion();
    }, []
    );


    // -------------------------------------------------  AgregarBar  ---------------------------------------------------------- 
    const barInicial: IBar = {
        nombre: '',
        direccion: '',
        latitud: 0,
        longitud: 0,
    };

    const [bar, setBar] = useState<IBar>(barInicial);

    const validaciones = Yup.object({
        nombre: Yup.string().required("El nombre del bar es requerido").max(50, "Máximo 50 caracteres").min(5, "mínimo 5 caracteres"),
        direccion: Yup.string().required("La dirección del bar es requerida").max(200, "Máximo 200 caracteres").min(10, "mínimo 10 caracteres"),
        latitud: Yup.number().required("La latitud es requerida es requerido"),
        longitud: Yup.number().required("La longitud es requerida")

    })

    const Insertar = async (bar: IBar) => {
        try {
            const request = await fetch("http://santiag0-001-site1.etempurl.com/Bares",
                {
                    method: "post",
                    body: JSON.stringify(bar),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
            console.log(request);
        } catch (error) {
            alert("error 723:" + error);
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

        // const map = L.map('map').setView([posicion.coords.latitude, posicion.coords.longitude], 16);
        // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     maxZoom: 20,
        //     attribution: '© OpenStreetMap'
        // }).addTo(map);

        bar.latitud = posicion.coords.latitude;
        bar.longitud = posicion.coords.longitude;
        setBar({ ...bar, latitud: posicion.coords.latitude });
        setBar({ ...bar, longitud: posicion.coords.longitude });
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




    // const coordenadasIniciales: ICoordenadas = {
    //     latitud: 0,
    //     longitud: 0
    // };
    // const [posicion, setPosicion] = useState<ICoordenadas>(coordenadasIniciales);
    // console.log(posicion);

    const [localizado, setLocalizado] = useState<boolean>(false);
    function LocationMarker() {
        const map = useMapEvents({
            click() {
                console.log("onClick");
                map.locate();
            },
            locationfound(e) {
                // setPosition(e.latlng)
                // alert("Latitud: " + bar.latitud + ", Longitud: " + bar.longitud);
                map.flyTo({ lat: bar.latitud, lng: bar.longitud }, map.getZoom());
                console.log("locationFound");
            },
        })

        return bar === null ? null : (
            <Marker position={{ lat: bar.latitud, lng: bar.longitud }}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <h3 className='text-center mb-4'>Agregar Bar</h3>
            <div className='row mb-4'>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                    <div>
                        <MapContainer center={{ lat: 19.870065050458365, lng: -97.37384522881341 }} zoom={13} scrollWheelZoom={false} >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker />
                        </MapContainer>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 container">
                    <Formik
                        initialValues={bar}
                        onSubmit={async e => {
                            await Insertar(e);
                            alert("¡Agregado correctamente! :)")
                            navegacion("/Bares")
                        }}
                        validationSchema={validaciones}
                    >
                        {(formikProps) => (
                            <Form>
                                <div className='row mb-2'>
                                    <label htmlFor='txtNombre'>Nombre</label>
                                    <input type='text' id="txtNombre" className='form-control' {...formikProps.getFieldProps("nombre")} />
                                    <ErrorMessage name="nombre">
                                        {mensaje => <span className='text-danger'>{mensaje}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className='row mb-2'>
                                    <label htmlFor='txtDireccion'>Dirección</label>
                                    <textarea id="txtDireccion" className='form-control' {...formikProps.getFieldProps("direccion")} />
                                    <ErrorMessage name="direccion">
                                        {mensaje => <span className='text-danger'>{mensaje}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className='row mb-2'>
                                    <label htmlFor='txtLatitud'>Latitud</label>
                                    <input type='number' id="txtLatitud" className='form-control' {...formikProps.getFieldProps("latitud")} />
                                    <ErrorMessage name="latitud">
                                        {mensaje => <span className='text-danger'>{mensaje}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className='row mb-2'>
                                    <label htmlFor='txtLongitud'>Longitud</label>
                                    <input type='number' id="txtLongitud" className='form-control' {...formikProps.getFieldProps("longitud")} />
                                    <ErrorMessage name="longitud">
                                        {mensaje => <span className='text-danger'>{mensaje}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className='row mb-2'>
                                    <div className="text-center col-12">
                                        <button type='button'
                                            onClick={(e) => formikProps.submitForm()}
                                            className='btn btn-success'
                                        >Guardar</button>
                                        <NavLink className="btn btn-dark ms-2" to={"/Bares"}>Regresar</NavLink>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
