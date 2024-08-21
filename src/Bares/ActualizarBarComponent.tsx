import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { IBar } from './IBar';
import * as Yup from 'yup'
import { ErrorMessage, Form, Formik } from 'formik';


export const ActualizarBarComponent = () => {

    const { id } = useParams();

    const navegacion = useNavigate();

    useEffect(() => {
        GetBuscarBar();
    }, []
    );

    const barInicial: IBar = {
        nombre: '',
        direccion: '',
        latitud: 0,
        longitud: 0,
    };


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
    const Actualizar = async (bar: IBar) => {
        try {
            const request = await fetch("http://santiag0-001-site1.etempurl.com/Bares",
                {
                    method: "put",
                    body: JSON.stringify(bar),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
        } catch (error) {
            alert(error);
        }

    }

    const validaciones = Yup.object({
        nombre: Yup.string().required("El nombre del bar es requerido").max(50, "Máximo 50 caracteres").min(5, "mínimo 5 caracteres"),
        direccion: Yup.string().required("La dirección del bar es requerida").max(200, "Máximo 200 caracteres").min(10, "mínimo 10 caracteres"),
        latitud: Yup.number().required("La latitud es requerida es requerido"),
        longitud: Yup.number().required("La longitud es requerida")

    });


    return (
        <>
            <h1>{id}</h1>
            <h3 className='text-center'>Actualizar Bar</h3>
            <Formik
                initialValues={bar}
                onSubmit={async e => {
                    e.id = id;
                    console.log("Formik");
                    console.log(e);
                    await Actualizar(e);
                    navegacion("/Bares");
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
                                    className='btn btn-warning'
                                >Actualizar</button>
                                <NavLink className="btn btn-dark ms-2" to={"/Bares"}>Regresar</NavLink>
                            </div>
                        </div>
                        
                        {/* <div className='row mb-2'>
                            <div className='col-md-4'>
                                <label htmlFor='txtNombre'>Nombre</label>
                                <input type='text' id="txtNombre" className='form-control' {...formikProps.getFieldProps("nombre")} />
                                <ErrorMessage name="nombre">
                                    {mensaje => <span className='text-danger'>{mensaje}</span>}
                                </ErrorMessage>
                            </div>
                        </div>
                        
                        <div className='row mb-2'>
                            <div className='col-md-4'>
                                <label htmlFor='txtDireccion'>Dirección</label>
                                <textarea id="txtDireccion" className='form-control' {...formikProps.getFieldProps("direccion")} />
                                <ErrorMessage name="direccion">
                                    {mensaje => <span className='text-danger'>{mensaje}</span>}
                                </ErrorMessage>
                            </div>
                        </div>

                        
                        <div className='row mb-2'>
                            <div className='col-md-4'>
                                <label htmlFor='txtLatitud'>Latitud</label>
                                <input type='number' id="txtLatitud" className='form-control' {...formikProps.getFieldProps("latitud")} />
                                <ErrorMessage name="latitud">
                                    {mensaje => <span className='text-danger'>{mensaje}</span>}
                                </ErrorMessage>
                            </div>
                        </div>

                        <div className='row mb-2'>
                            <div className='col-md-4'>
                                <label htmlFor='txtLongitud'>Longitud</label>
                                <input type='number' id="txtLongitud" className='form-control' {...formikProps.getFieldProps("longitud")} />
                                <ErrorMessage name="longitud">
                                    {mensaje => <span className='text-danger'>{mensaje}</span>}
                                </ErrorMessage>
                            </div>
                        </div>


                        <div className='row mb-2'>
                            <div className="text-center col-12">
                                <button type='button'
                                    onClick={(e) => formikProps.submitForm()}
                                    className='btn btn-success'
                                >Guardar</button>
                                <NavLink className="btn btn-dark ms-2" to={"/Bares"}>Regresar</NavLink>
                            </div>
                        </div> */}
                    </Form>
                )}
            </Formik>
        </>
    )
}
