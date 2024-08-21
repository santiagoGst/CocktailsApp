import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ContextApp from '../Models/Contexto';
import { IUsuario } from './IUsuario';
import * as Yup from 'yup'
import { ErrorMessage, Form, Formik } from 'formik';


const RegistrarUsuarioComponent = () => {

    const { cambiar } = useContext(ContextApp);

    const navegacion = useNavigate();

    const usuarioInicial: IUsuario = {
        nombre: '',
        nombreUsuario: '',
        pwd: '',
        rol: 'usuario'
    };

    const [usuario, setUsuario] = useState<IUsuario>(usuarioInicial);

    const validaciones = Yup.object({
        nombre: Yup.string().required("El nombre es requerido").max(100, "Máximo 100 caracteres").min(5, "mínimo 5 caracteres"),
        nombreUsuario: Yup.string().required("El nombre de usuario es requerido").max(100, "Máximo 100 caracteres").min(4, "mínimo 4 caracteres"),
        pwd: Yup.string().required("La contraseña es requerida").max(20, "Máximo 20 caracteres").min(4, "mínimo 4 caracteres"),
    })

    const Registrar = async (usuario: IUsuario) => {
        try {
            const request = await fetch("http://santiag0-001-site1.etempurl.com/Inicio/RegistrarUsuario",
                {
                    method: "post",
                    body: JSON.stringify(usuario),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
        } catch (error) {
            alert(error);
        }

    }


    return (
        <>
            <h3 className='mt-3 text-center'>Regístrate</h3>
            
            <Formik
                initialValues={usuario}
                onSubmit={async e => {
                    await Registrar(e);
                    //cambiar(true, 'Agus')
                    navegacion("/")
                }}
                validationSchema={validaciones}
            >
                {(formikProps) => (
                    <Form>
                        <div className='text-center row mb-2'>
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
                                <label htmlFor='txtUsuario'>Usuario</label>
                                <input type='text' id="txtUsuario" className='form-control' {...formikProps.getFieldProps("nombreUsuario")} />
                                <ErrorMessage name="nombreUsuario">
                                    {mensaje => <span className='text-danger'>{mensaje}</span>}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className='col-md-4'>
                                <label htmlFor='txtPwd'>Contraseña</label>
                                <input type='text' id="txtPwd" className='form-control' {...formikProps.getFieldProps("pwd")} />
                                <ErrorMessage name="pwd">
                                    {mensaje => <span className='text-danger'>{mensaje}</span>}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className="text-center col-12">
                                <button type='button'
                                    onClick={(e) => formikProps.submitForm()}
                                    className='btn btn-success'
                                >Registrar</button>
                                <NavLink className="btn btn-dark ms-2" to={"/"}>Regresar</NavLink>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default RegistrarUsuarioComponent