import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import ContextApp from '../Models/Contexto';

import { ICocktel } from './ICocktel';

export const PrincipalComponent = () => {

	const { nombre } = useContext(ContextApp);


	useEffect(() => {
		GetCockteles();
	}, []
	);

	const [cockteles, setCockteles] = useState<ICocktel[]>([]);

	const GetCockteles = async () => {
		try {
			const respuesta = await fetch("http://santiag0-001-site1.etempurl.com/Cockteles");
			const json = await respuesta.json();
			setCockteles(json);
			console.log(json);
		} catch (error) {
			alert("prueba 321: " + error);
		}
	}

	return (
		<>
			<h2 className='mt-4 mb-4'>Cocktails</h2>
			<div className="row row-cols-1 row-cols-md-3 g-4 container">
				{cockteles.map((b, i) => (
					<NavLink to={`/VerCocktel/${b.id}`} className="btn col mb-3">
						<div className="card h-100">
							<img src={b.urlFoto} className="card-img-top" alt="..." />
							<div className="card-body">
								<h3 className="card-title">{b.nombre}</h3>
								<p className="card-text">{b.nombreCategoria}</p>
								{b.informacion == 'Alcohólica' ?
									<p className="card-text text-danger">{b.informacion}</p>
									:
									<p className="card-text text-success">{b.informacion}</p>
								}
							</div>
						</div>
					</NavLink>
				))}
			</div>
		</>
	)
}

export default PrincipalComponent
