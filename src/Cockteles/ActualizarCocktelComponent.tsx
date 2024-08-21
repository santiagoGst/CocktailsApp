import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ICategoriaCocktel } from './ICategoriaCocktel';
import { ICocktel } from './ICocktel';
import { IVidrio } from './IVidrio';
import * as Yup from 'yup'
import { ErrorMessage, Form, Formik } from 'formik';
import { IBar } from '../Bares/IBar';
import { join } from 'path';


export const ActualizarCocktelComponent = () => {

    const { id } = useParams();
    const navegacion = useNavigate();

    useEffect(() => {
        GetBuscarCocktel();
        GetCategoriasCockteles();
        GetVidrios();
        GetBares();
    }, []
    );


    // -------------------------------------------------  Buscar Bares  ----------------------------------------------------------
    const [disponibleBares, setDisponibleBares] = useState<IBar[]>([]);
    const [bares, setBares] = useState<IBar[]>([]);
    const GetBares = async () => {
        try {
            const respuesta = await fetch("http://santiag0-001-site1.etempurl.com/Bares");
            const json = await respuesta.json();
            json.forEach((b: IBar) => {
                cocktel.disponibleBar?.forEach((cb: IBar) => {
                    if (b.id == cb.id) {
                        b.tempSeleccionado = true
                    }
                    else {
                        b.tempSeleccionado = false;
                    }
                });
            });
            setBares(json);
            console.log(bares);
        } catch (error) {
            alert("Prueba 793: " + error);
        }
    }

    // -------------------------------------------------  Seleccionar Bares  ----------------------------------------------------------
    const ActualizarDisponibleBares = (b: IBar) => {
        let index = bares.findIndex(x => x.id == b.id);
        if (b.tempSeleccionado == false) {
            const arrayTemp = [...bares];
            b.tempSeleccionado = true;
            arrayTemp[index] = b;
            setBares(arrayTemp);
            setDisponibleBares([...disponibleBares, b]);
        }
        else {
            const arrayTemp = [...bares];
            b.tempSeleccionado = false;
            arrayTemp[index] = b;
            setBares(arrayTemp);

            const arrayTemp2 = disponibleBares.filter(x => x.id != b.id);
            setDisponibleBares(arrayTemp2);
            console.log("-- fue true");
            console.log("-- Mostrar cocktel temporal");
            console.log(cocktel);
        }
        setCocktel({ ...cocktel, disponibleBar: disponibleBares });
    }



    // ------------------------------------------  Categorísas Cockteles -----------------------------------------------------
    const [categoriasCockteles, setCategoriasCockteles] = useState<ICategoriaCocktel[]>([]);
    const GetCategoriasCockteles = async () => {
        try {
            const respuesta = await fetch("http://santiag0-001-site1.etempurl.com/CategoriasCockteles");
            const json = await respuesta.json();
            setCategoriasCockteles(json);
        } catch (error) {
            alert("prueba 321: " + error);
        }
    }

    // ------------------------------------------  Categorísas Cockteles -----------------------------------------------------
    const [nombreVidrio, setVidrio] = useState<IVidrio[]>([]);
    const GetVidrios = async () => {
        try {
            const respuesta = await fetch("http://santiag0-001-site1.etempurl.com/Vidrios");
            const json = await respuesta.json();
            setVidrio(json);
        } catch (error) {
            alert("prueba 201: " + error);
        }
    }


    // ------------------------------------------  Cockteles -----------------------------------------------------
    const cocktelInicial: ICocktel = {
        nombre: '',
        nombreCategoria: '',
        informacion: '',
        ingredientes: '',
        instrucciones: '',
        nombreVidrio: '',
        urlFoto: '',
    };
    const GetBuscarCocktel = async () => {
        const respuesta = await fetch("http://santiag0-001-site1.etempurl.com/Cockteles/Individual?id=" + id);
        const json = await respuesta.json();
        // setProducto(json);
        cocktel.nombre = json.nombre;
        cocktel.nombreCategoria = json.nombreCategoria;
        cocktel.informacion = json.informacion;
        cocktel.ingredientes = json.ingredientes;
        cocktel.instrucciones = json.instrucciones;
        cocktel.nombreVidrio = json.nombreVidrio;
        cocktel.urlFoto = json.urlFoto;
        cocktel.disponibleBar = json.disponibleBar;
        setCocktel({ ...cocktelInicial, nombre: json.nombre });
        setCocktel({ ...cocktelInicial, nombreCategoria: json.nombreCategoria });
        setCocktel({ ...cocktelInicial, informacion: json.informacion });
        setCocktel({ ...cocktelInicial, ingredientes: json.ingredientes });
        setCocktel({ ...cocktelInicial, instrucciones: json.instrucciones });
        setCocktel({ ...cocktelInicial, nombreVidrio: json.nombreVidrio });
        setCocktel({ ...cocktelInicial, urlFoto: json.urlFoto });
        setCocktel({ ...cocktelInicial, disponibleBar: json.disponibleBar });
        console.log(json);
        console.log(bares);
    }
    const [cocktel, setCocktel] = useState<ICocktel>(cocktelInicial);
    const Insertar = async (cocktel: ICocktel) => {
        try {
            const request = await fetch("http://santiag0-001-site1.etempurl.com/Cockteles",
                {
                    method: "put",
                    body: JSON.stringify(cocktel),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
            console.log(request);
        } catch (error) {
            alert("error 723:" + error);
        }

    };
    const validaciones = Yup.object({
        nombre: Yup.string().required("El nombre del cocktel es requerido").max(50, "Máximo 50 caracteres").min(2, "mínimo 2 caracteres"),
        ingredientes: Yup.string().required("Los ingredientes del cocktel son requeridos").max(500, "Máximo 500 caracteres").min(5, "mínimo 5 caracteres"),
        instrucciones: Yup.string().required("Es necesario agregar las instrucciones de preparación").max(1000, "Máximo 1000 caracteres").min(5, "mínimo 5 caracteres"),
        urlFoto: Yup.string().required("El nombre del cocktel es requerido").max(1000, "Máximo 1000 caracteres").min(5, "mínimo 5 caracteres")
    });

    return (
        <>
            <h3 className='text-center'>Actualizar Cocktel</h3>
            <Formik
                initialValues={cocktel}
                onSubmit={async e => {
                    e.id = id;
                    console.log(e);
                    await Insertar(e);
                    alert("Cocktel actualizado correctamente! :)");
                    navegacion(`/VerCocktel/${id}`);
                }}
                validationSchema={validaciones}
            >
                {(formikProps) => (
                    <Form>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 container">
                                <table className="table table-striped table-hover">
                                    <thead className='table-dark'>
                                        <tr>
                                            <th>Nombre Bar</th>
                                            <th>Dirección</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bares.map((b, i) => (
                                            <tr>
                                                <td><label htmlFor={b.nombre} >{b.nombre}</label></td>
                                                <td><label htmlFor={b.nombre} >{b.direccion}</label></td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id={b.nombre}
                                                            onChange={(e) => ActualizarDisponibleBares(b)}
                                                            checked={b.tempSeleccionado}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7 ps-5 pe-5">
                                <div className='row mb-3'>
                                    <label htmlFor='txtNombre'>Nombre</label>
                                    <input type='text' id="txtNombre" className='form-control' {...formikProps.getFieldProps("nombre")} />
                                    <ErrorMessage name="nombre">
                                        {mensaje => <span className='text-danger'>{mensaje}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className='row mb-3'>
                                    <label htmlFor='cmbCategoriaCocktel'>Categoría</label>
                                    <select id='cmbCategoriaCocktel' className='form-select' {...formikProps.getFieldProps("nombreCategoria")} >
                                        {categoriasCockteles.map((cc, i) => (
                                            <option value={cc.nombreCategoria}>{cc.nombreCategoria}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='row mb-3'>
                                    <label htmlFor='txtInformacion'>¿Contiene Alcohol?</label>
                                    <select id='cmbInformacion' className='form-select' {...formikProps.getFieldProps("informacion")} >
                                        <option value="op1">Alcoholica</option>
                                        <option value="op2">Sin alcohol</option>
                                    </select>
                                </div>
                                <div className='row mb-3'>
                                    <label htmlFor='txtIngredientes'>Ingredientes</label>
                                    <textarea id="txtIngredientes" className='form-control' {...formikProps.getFieldProps("ingredientes")} />
                                    <ErrorMessage name="ingredientes">
                                        {mensaje => <span className='text-danger'>{mensaje}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className='row mb-3'>
                                    <label htmlFor='txtInstrucciones'>Instrucciones</label>
                                    <textarea id="txtInstrucciones" className='form-control' {...formikProps.getFieldProps("instrucciones")} />
                                    <ErrorMessage name="instrucciones">
                                        {mensaje => <span className='text-danger'>{mensaje}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className='row mb-3'>
                                    <label htmlFor='cmbVidrio'>Vidrio</label>
                                    <select id='cmbVidrio' className='form-select' {...formikProps.getFieldProps("nombreVidrio")}>
                                        {nombreVidrio.map((vi, i) => (
                                            <option value={vi.nombreVidrio} >{vi.nombreVidrio}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='row mb-3'>
                                    <label htmlFor='txtUrlFoto'>UrlFoto</label>
                                    <input type='text' id="txtUrlFoto" className='form-control' {...formikProps.getFieldProps("urlFoto")}
                                    />
                                    <ErrorMessage name="urlFoto">
                                        {mensaje => <span className='text-danger'>{mensaje}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className='row mb-4'>
                                    <div className="text-center col-12">
                                        <button type='button'
                                            onClick={(e) => formikProps.submitForm()}
                                            className='btn btn-warning'
                                        >Actualizar</button>
                                        <NavLink className="btn btn-dark ms-2" to={`/VerCocktel/${id}`}>Regresar</NavLink>
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
