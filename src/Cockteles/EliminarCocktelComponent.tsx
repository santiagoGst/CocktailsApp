import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ICocktel } from './ICocktel';

export const EliminarCocktelComponent = () => {

    const { id } = useParams();

    const navegacion = useNavigate();

    const cocktelInicial: ICocktel = {
        nombre: '',
        nombreCategoria: '',
        informacion: '',
        ingredientes: '',
        instrucciones: '',
        nombreVidrio: '',
        urlFoto: '',
    };

    useEffect(() => {
        GetBuscarCocktel();
    }, []
    );

    const GetBuscarCocktel = async () => {
        const respuesta = await fetch("http://santiag0-001-site1.etempurl.com/Cockteles/Individual?id=" + id);
        const json = await respuesta.json();
        // setProducto(json);
        setCocktel({ ...cocktelInicial, nombre: json.nombre });
        setCocktel({ ...cocktelInicial, nombreCategoria: json.nombreCategoria });
        setCocktel({ ...cocktelInicial, informacion: json.informacion });
        setCocktel({ ...cocktelInicial, ingredientes: json.ingredientes });
        setCocktel({ ...cocktelInicial, instrucciones: json.instrucciones });
        setCocktel({ ...cocktelInicial, nombreVidrio: json.nombreVidrio });
        setCocktel({ ...cocktelInicial, urlFoto: json.urlFoto });
        cocktel.nombre = json.nombre;
        cocktel.nombreCategoria = json.nombreCategoria;
        cocktel.informacion = json.informacion;
        cocktel.ingredientes = json.ingredientes;
        cocktel.instrucciones = json.instrucciones;
        cocktel.nombreVidrio = json.nombreVidrio;
        cocktel.urlFoto = json.urlFoto;
        console.log(json);
    }
    const [cocktel, setCocktel] = useState<ICocktel>(cocktelInicial);


    const Eliminar = async (bar: ICocktel) => {
        try {
            const request = await fetch("http://santiag0-001-site1.etempurl.com/Cockteles?id=" + id,
                {
                    method: "delete",
                })
        } catch (error) {
            alert(error);
        }
    }



    return (
        <>

            <Formik
                initialValues={cocktel}
                onSubmit={async e => {
                    e.id = id;
                    console.log("Formik");
                    console.log(e);
                    await Eliminar(e);
                    navegacion("/");
                }}
            >
                {(formikProps) => (
                    <Form>
                        <h1 className="text-center text-danger mt-4 mb-4" >¿Eliminar Cocktel de manera permanente?</h1>
                        <div className="row">
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <div className="highlight" >
                                    <img src={cocktel.urlFoto} className="card-img-top" alt="Foto producto" />
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                <input type="hidden" asp-for="Id" />
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Nombre</th>
                                            <td><input type="text" className="text-center form-control-plaintext" {...formikProps.getFieldProps("nombre")} /></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Categoría</th>
                                            <td><input type="text" className="text-center form-control-plaintext" {...formikProps.getFieldProps("nombreCategoria")} /></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Información</th>
                                            <td><input type="text" className="text-center form-control-plaintext" {...formikProps.getFieldProps("informacion")} /></td>

                                        </tr>
                                        <tr>
                                            <th scope="row">Ingredientes</th>
                                            <td height='100'><textarea className="text-center form-control-plaintext" {...formikProps.getFieldProps("ingredientes")} /></td>

                                        </tr>
                                        <tr>
                                            <th scope="row">Instrucciones</th>
                                            <td height='150'><textarea className="text-center form-control-plaintext" {...formikProps.getFieldProps("instrucciones")} /></td>

                                        </tr>
                                        <tr>
                                            <th scope="row">Vidrio</th>
                                            <td><input type="text" className="text-center form-control-plaintext" {...formikProps.getFieldProps("nombreVidrio")} /></td>

                                        </tr>
                                    </tbody>
                                </table>
                                <div className="form-group row">
                                    <div className="col-md-12 text-center">
                                        <button type='button'
                                            onClick={(e) => formikProps.submitForm()}
                                            className='btn btn-danger'
                                        >Eliminar</button>
                                        <NavLink className="btn btn-dark ms-2" to={"/"}>Regresar</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}
