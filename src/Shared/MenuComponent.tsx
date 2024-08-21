import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import ContextApp from '../Models/Contexto'

const MenuComponent = () => {

    const { cambiar, bandera, nombre, rol } = useContext(ContextApp)

    return (
        <div className='mb-5'>
            <nav className="navbar fixed-top navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Cocktails</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {bandera ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/Bares">Bares</NavLink>
                                </li>
                                {rol == "admin" ?
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link active" aria-current="page" to="/AgregarCocktel">Agregar Cocktel</NavLink>
                                        </li>
                                    </> :
                                    <></>
                                }

                                <li className="nav-item">
                                    <button className='btn btn' onClick={(e) => {
                                        cambiar(false, '---', '---');
                                    }}>Cerrar Sesión</button>
                                </li>
                            </ul>
                            :
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            </ul>

                        }
                        <span>
                            <h3>
                                {nombre}
                            </h3>
                        </span>
                    </div>
                </div>
            </nav>
            <h4>.</h4>
        </div>
    )
}

export default MenuComponent