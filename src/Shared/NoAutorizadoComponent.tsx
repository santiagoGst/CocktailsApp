import React from 'react'
import { NavLink } from 'react-router-dom'

export const NoAutorizadoComponent = () => {
  return (
    <div>
      <h1 className='text-danger'>No Autorizado</h1>
      <NavLink className="btn btn-secondary mt-4" to={"/"}>Regresar</NavLink>
    </div>
  )
}
