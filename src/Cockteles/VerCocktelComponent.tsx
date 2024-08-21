import { Console } from 'console';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ICocktel } from './ICocktel';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import ContextApp from '../Models/Contexto';

export const VerCocktelComponent = () => {

    const { cambiar, bandera, rol } = useContext(ContextApp);
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
		disponibleBar: [{
			id: '',
			nombre: '',
			direccion: '',
			latitud: 0,
			longitud: 0
		}]
	};

	useEffect(() => {
		GetBuscarCocktel();
	}, []
	);

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
		// console.log(" -------  Ver cocktel  ---------");
		// console.log(json);
		// console.log(" -------  Ver cocktel -bares  ---------");
		// console.log(json.disponibleBar);
	}

	const [cocktel, setCocktel] = useState<ICocktel>(cocktelInicial);

	return (
		<>
			<Formik
				initialValues={cocktel}
				onSubmit={async e => {
					console.log(e);
				}}
			>
				{(formikProps) => (
					<Form>

						<h1 className="text-center mt-3" ><input type="text" className="text-center form-control-plaintext" {...formikProps.getFieldProps("nombre")} readOnly /></h1>
						{rol == "admin" ?
							<p className='text-start'>
								<NavLink className={"btn btn-warning mb-1 me-3"} to={`/ActualizarCocktel/${id}`}>Actualizar</NavLink>
								<NavLink className={"btn btn-danger mb-1 me-3"} to={`/EliminarCocktel/${id}`}>Eliminar</NavLink>
							</p> :
							<></>
						}

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
											<th scope="row">Categoría</th>
											<td><input type="text" className="text-center form-control-plaintext" {...formikProps.getFieldProps("nombreCategoria")} readOnly /></td>
										</tr>
										<tr>
											<th scope="row">Información</th>
											<td><input type="text" className="text-center form-control-plaintext" {...formikProps.getFieldProps("informacion")} readOnly /></td>

										</tr>
										<tr>
											<th scope="row">Ingredientes</th>
											<td height='100'><textarea className="text-center form-control-plaintext" {...formikProps.getFieldProps("ingredientes")} rows={3} readOnly /></td>

										</tr>
										<tr>
											<th scope="row">Instrucciones</th>
											<td height='150'><textarea className="text-center form-control-plaintext" {...formikProps.getFieldProps("instrucciones")} rows={5} readOnly /></td>

										</tr>
										<tr>
											<th scope="row">Vidrio</th>
											<td><input type="text" className="text-center form-control-plaintext" {...formikProps.getFieldProps("nombreVidrio")} readOnly /></td>

										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<h4 className='mt-5 mb-4'>¿Dónde lo encuentro?</h4>
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 container">
								<input type="hidden" asp-for="Id" />
								<table className="table table-striped table-hover">
									<thead className='table-dark'>
										<tr>
											<th>Nombre Bar</th>
											<th>Direccion</th>
											{/* <th>Latitud</th>
											<th>Longitud</th> */}
										</tr>
									</thead>
									<tbody>
										{cocktel.disponibleBar?.map((b, i) => (
											<tr>
												<td>{b.nombre}</td>
												<td>{b.direccion}</td>
												{/* <td>{b.latitud}</td>
												<td>{b.longitud}</td> */}
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-7">
								<MapContainer center={{ lat: 19.870264962913524, lng: -97.37439595135854 }} zoom={13} scrollWheelZoom={false} >
									<TileLayer
										attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									/>
									{cocktel.disponibleBar?.map((b, i) => (<Marker position={[b.latitud, b.longitud]}>
										{/* <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup> */}
									</Marker>))}
									{/* <LocationMarker /> */}
								</MapContainer>
							</div>
						</div>
						<div className="form-group row mt-4 mb-5">
							<div className="col-md-12 text-center">
								<NavLink className="btn btn-dark ms-2" to={"/"}>Regresar</NavLink>

							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	)
}
