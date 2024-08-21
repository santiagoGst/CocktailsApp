import React, { useEffect, useState } from 'react'
import { ICocktel } from './ICocktel';
import * as Yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import { ICategoriaCocktel } from './ICategoriaCocktel';
import { IVidrio } from './IVidrio';
import { IBar } from '../Bares/IBar';


export const AgregarCocktelComponent = () => {

	const navegacion = useNavigate();

	useEffect(() => {
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
				b.tempSeleccionado = false;
			});
			json.forEach((b: IBar) => {
				console.log(b.tempSeleccionado);
			});
			setBares(json);
		} catch (error) {
			alert("prueba 321: " + error);
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
			console.log("-- fue false");
			console.log("-- Mostrar disponible bares");
			console.log(disponibleBares);
			console.log("-- Mostrar cocktel temporal");
			console.log(cocktel);
			setCoc(cocktel);
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
			setCoc(cocktel);
		}
		setCocktel({ ...cocktel, disponibleBar: disponibleBares });
		setCoc({ ...cocktel, disponibleBar: disponibleBares });
		console.log("-- bares deleccionados -- ");
		bares.forEach((b: IBar) => {
			console.log(b.tempSeleccionado);
		});
	}

	// ------------------------------------------  Categorísas Cockteles  -----------------------------------------------------
	const [categoriasCockteles, setCategoriasCockteles] = useState<ICategoriaCocktel[]>([]);
	const GetCategoriasCockteles = async () => {
		try {
			const respuesta = await fetch("http://santiag0-001-site1.etempurl.com/CategoriasCockteles");
			const json = await respuesta.json();
			setCategoriasCockteles(json);
			setCocktel({ ...cocktelInicial, nombreCategoria: json[0].nombreCategoria });
			cocktel.nombreCategoria = json[0].nombreCategoria;
		} catch (error) {
			alert("prueba 321: " + error);
		}
	}

	// ------------------------------------------  Vidrios Cockteles  -----------------------------------------------------
	const [vidriosCockteles, setVidriosCockteles] = useState<IVidrio[]>([]);
	const GetVidrios = async () => {
		try {
			const respuesta = await fetch("http://santiag0-001-site1.etempurl.com/Vidrios");
			const json = await respuesta.json();
			setVidriosCockteles(json);
			setCocktel({ ...cocktelInicial, nombreVidrio: json[0].nombreVidrio });
			cocktel.nombreVidrio = json[0].nombreVidrio;
		} catch (error) {
			alert("prueba 201: " + error);
		}
	}


	// ------------------------------------------  Insertar Cocktel  -----------------------------------------------------
	const cocktelInicial: ICocktel = {
		nombre: '',
		nombreCategoria: '',
		informacion: 'Alcoholica',
		ingredientes: '',
		instrucciones: '',
		nombreVidrio: '',
		urlFoto: '',
		disponibleBar: disponibleBares
	};
	const [coc, setCoc] = useState<ICocktel>(cocktelInicial);
	const [cocktel, setCocktel] = useState<ICocktel>(cocktelInicial);

	const Insertar = async (cocktel: ICocktel) => {
		// setCocktel({ ...cocktel, disponibleBar: disponibleBares });
        setCocktel({ ...cocktelInicial, disponibleBar: disponibleBares });
        cocktel.disponibleBar = disponibleBares;
		ActualizarDisponibleBares(bares[0]);
		console.log("coc:  ")
		console.log(coc);
		console.log(disponibleBares);
		console.log(cocktel);

		try {
			const request = await fetch("http://santiag0-001-site1.etempurl.com/Cockteles",
				{
					method: "post",
					body: JSON.stringify(cocktel),
					headers: { "Content-type": "application/json; charset=UTF-8" }
				})
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
			<h3 className='text-center mb-5'>Agregar Cocktel</h3>

			<Formik
				initialValues={cocktel}
				onSubmit={async e => {
					console.log('e');
					console.log(e);
					await Insertar(e);
					alert("¡Agregado correctamente! :)")
					navegacion("/")
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
															onChange={(e) =>
																ActualizarDisponibleBares(b)
															}
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
											{vidriosCockteles.map((vi, i) => (
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
											className='btn btn-success'
										>Guardar</button>
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