import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ContextApp from '../Models/Contexto';
import { IUsuario } from './IUsuario';
import * as Yup from 'yup'
import { ErrorMessage, Form, Formik } from 'formik';


export const IniciarSesionComponent = () => {

    const { cambiar } = useContext(ContextApp);
    let banderaValido = false;

    const usuarioInicial: IUsuario = {
        nombreUsuario: '',
        pwd: '',
        rol: ''
    };

    const [usuario, setUsuario] = useState<IUsuario>(usuarioInicial);

    const validaciones = Yup.object({
        nombreUsuario: Yup.string().required("El nombre de usuario es requerido").max(100, "Máximo 100 caracteres").min(4, "mínimo 4 caracteres"),
        pwd: Yup.string().required("La contraseña es requerida").max(20, "Máximo 20 caracteres").min(4, "mínimo 4 caracteres"),
    })

    const Validar = async (usuario: IUsuario) => {
        try {
            const respuesta = await fetch("http://santiag0-001-site1.etempurl.com/Inicio/ValidarUsuario",
                {
                    method: "post",
                    body: JSON.stringify(usuario),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(
                    (res) => res.json()
                )
                .then((data) => {
                    console.log(data);
                    cambiar(true, data.nombre, data.rol);
                }
                );;
        } catch (error) {
            // alert(error);
            banderaValido = true;
        }

    }

    return (
        <>

            <Formik
                initialValues={usuario}
                onSubmit={async e => {
                    await Validar(e);
                }}
                validationSchema={validaciones}
            >
                {(formikProps) => (
                    <Form>
                        <div className="row mt-2 ">
                            <div className="col-xs-12 offset-sm-2 col-sm-8 offset-md-4 col-md-4 offset-lg-4 col-lg-4">
                                <div className="card">
                                    <h5 className="card-header bg-dark text-white text-center">Iniciar Sesión</h5>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <img src="http://cdn.onlinewebfonts.com/svg/img_337531.png" className="img-fluid" width="200" alt="sin imagen" />
                                            </div>
                                        </div>
                                        <div className="row mt-3 text-start">
                                            <div className="col-12">
                                                <h6><label htmlFor='txtUsuario'>Usuario</label></h6>
                                                <input type='text' id="txtUsuario" className='form-control' {...formikProps.getFieldProps("nombreUsuario")} placeholder="Ingrese su nobre de usario" />
                                                <ErrorMessage name="nombreUsuario">
                                                    {mensaje => <span className='text-danger'>{mensaje}</span>}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row mt-4 mb-3 text-start">
                                            <div className="col-12">
                                                <h6><label htmlFor='txtPwd'>Contraseña</label></h6>
                                                <input type='password' id="txtPwd" className='form-control' {...formikProps.getFieldProps("pwd")} placeholder="Ingrese su contraseña" />
                                                <ErrorMessage name="pwd">
                                                    {mensaje => <span className='text-danger'>{mensaje}</span>}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        {banderaValido ? <span className='text-danger'>Usuario y/o contraseña incorrectos</span> : <></>}
                                        <div className="d-grid gap-2 mt-5">
                                            <button type='button' className='btn btn-primary'
                                                onClick={(e) => formikProps.submitForm()}
                                            >Iniciar Sesión
                                            </button>
                                            <NavLink className={"btn btn-outline-success mb-2"} to={'/RegistrarUsuario'}>Regístrate</NavLink>
                                        </div>
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
