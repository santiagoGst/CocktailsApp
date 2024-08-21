import React from 'react'

const ContextApp = React.createContext<{
    nombre: string;
    bandera: boolean;
    rol: string;
    cambiar(bandera: boolean, nombre: string, rol: string): void;   
}>({nombre: '',bandera: false, rol: '', cambiar: ()=>{} })

export default ContextApp;