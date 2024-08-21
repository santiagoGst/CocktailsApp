import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MenuComponent from './Shared/MenuComponent';
import ContextApp from './Models/Contexto';

import { NoAutorizadoComponent } from './Shared/NoAutorizadoComponent';
import { IniciarSesionComponent } from './Inicio/IniciarSesionComponent';
import RegistrarUsuarioComponent from './Inicio/RegistrarUsuarioComponent';

import PrincipalComponent from './Cockteles/PrincipalComponent';
import { AgregarCocktelComponent } from './Cockteles/AgregarCocktelComponent';
import { VerCocktelComponent } from './Cockteles/VerCocktelComponent';
import { EliminarCocktelComponent } from './Cockteles/EliminarCocktelComponent';
import { ActualizarCocktelComponent } from './Cockteles/ActualizarCocktelComponent';

import { PrincipalBarComponent } from './Bares/PrincipalBarComponent';
import { AgregarBarComponent } from './Bares/AgregarBarComponent';
import { EliminarBarComponent } from './Bares/EliminarBarComponent';
import { ActualizarBarComponent } from './Bares/ActualizarBarComponent';

function App() {

  const [nombre, setNombre] = useState<string>('---')
  const [bandera, setBandera] = useState<boolean>(false)
  const [rol, setRol] = useState<string>('---')

  function cambiar(b: boolean, n: string, r: string){
    setNombre(n);
    setBandera(b);
    setRol(r);
  }
  
  return (
    <div className="App">

      <>
        <BrowserRouter>
          <ContextApp.Provider value={{nombre, bandera, rol, cambiar}}>
            <MenuComponent></MenuComponent>
            <div className='container'>
              <Routes>
                {/* <Route path='/' element={bandera ? <PrincipalComponent /> : <IniciarSesionComponent />}></Route> */}

                <Route path='/RegistrarUsuario' element={<RegistrarUsuarioComponent />}></Route>

                <Route path='/' element={bandera ? <PrincipalComponent /> : <IniciarSesionComponent /> }></Route>
                <Route path='/AgregarCocktel' element={bandera ? <AgregarCocktelComponent /> : <NoAutorizadoComponent/> }></Route>
                <Route path='/VerCocktel/:id' element={bandera ? <VerCocktelComponent /> : <NoAutorizadoComponent/> }></Route>
                <Route path='/ActualizarCocktel/:id' element={bandera ? <ActualizarCocktelComponent /> : <NoAutorizadoComponent/> }></Route>
                <Route path='/EliminarCocktel/:id' element={bandera ? <EliminarCocktelComponent /> : <NoAutorizadoComponent/> }></Route>
                <Route path='/Bares' element={bandera ? <PrincipalBarComponent /> : <NoAutorizadoComponent/> }></Route>
                <Route path='/AgregarBar' element={bandera ? <AgregarBarComponent /> : <NoAutorizadoComponent/> }></Route>
                <Route path='/ActualizarBar/:id' element={bandera ? <ActualizarBarComponent /> : <NoAutorizadoComponent/> }></Route>
                <Route path='/EliminarBar/:id' element={bandera ? <EliminarBarComponent /> : <NoAutorizadoComponent/> }></Route>
              </Routes>
            </div>
          </ContextApp.Provider>
        </BrowserRouter>
      </>
    </div>

  );
}

export default App;