import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { IBar } from './IBar';

export const EliminarBarComponent = () => {


    const { id } = useParams();

    const navegacion = useNavigate();

    const barInicial: IBar = {
        nombre: '',
        direccion: '',
        latitud: 0,
        longitud: 0
    };

    useEffect(() => {
        GetBuscarBar();
    }, []
    );

    const GetBuscarBar = async () => {
        const respuesta = await fetch("http://santiag0-001-site1.etempurl.com/Bares/Individual?id=" + id);
        const json = await respuesta.json();
        // setProducto(json);
        setBar({ ...barInicial, nombre: json.nombre });
        setBar({ ...barInicial, direccion: json.direccion });
        setBar({ ...barInicial, latitud: json.latitud });
        setBar({ ...barInicial, longitud: json.longitud });
        barInicial.nombre = json.nombre;
        barInicial.direccion = json.direccion;
        barInicial.latitud = json.latitud;
        barInicial.longitud = json.longitud;
        console.log(json);
    }

    const [bar, setBar] = useState<IBar>(barInicial);

    const Eliminar = async (bar: IBar) => {
        try {
            const request = await fetch("http://santiag0-001-site1.etempurl.com/Bares?id=" + id,
                {
                    method: "delete",
                })
        } catch (error) {
            alert(error);
        }
    }



    return (
        <>
            {/* <h1>{id}</h1> */}
            <h1 className='text-center text-danger mt-4'>¿Eliminar Bar?</h1>
            <Formik
                initialValues={bar}
                onSubmit={async e => {
                    e.id = id;
                    console.log("Formik");
                    console.log(e);
                    await Eliminar(e);
                    navegacion("/Bares");
                }}
            >
                {(formikProps) => (
                    <Form>
                        <div className='row mb-2'>
                            <div className='col-md-4'>
                                <label htmlFor='txtNombre'>Nombre</label>
                                <input type='text' id="txtNombre" className='form-control' {...formikProps.getFieldProps("nombre")} disabled />
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className='col-md-4'>
                                <label htmlFor='txtDireccion'>Dirección</label>
                                <textarea id="txtDireccion" className='form-control' {...formikProps.getFieldProps("direccion")} disabled />
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className='col-md-4'>
                                <label htmlFor='txtLatitud'>Latitud</label>
                                <input type='number' id="txtLatitud" className='form-control' {...formikProps.getFieldProps("latitud")} disabled />
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className='col-md-4'>
                                <label htmlFor='txtLongitud'>Longitud</label>
                                <input type='number' id="txtLongitud" className='form-control' {...formikProps.getFieldProps("longitud")} disabled />
                            </div>
                        </div>

                        <div className='row mb-2'>
                            <div className="text-center col-12">
                                <button type='button'
                                    onClick={(e) => formikProps.submitForm()}
                                    className='btn btn-danger'
                                >Eliminar</button>
                                <NavLink className="btn btn-dark ms-2" to={"/Bares"}>Regresar</NavLink>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}