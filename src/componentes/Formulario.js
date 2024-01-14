import React, { useState } from "react";
import styled from "styled-components";
import db from "./../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioAgregarContacto = () => {
	const [nombre, cambiarNombre] = useState("");
	const [correo, cambiarCorreo] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault(); //No se recargue la page por completo.

		try {
			//nos conectamos a la bd y a la tabla-collecction en concreto.
			await addDoc(collection(db, "usuarios"), {
				nombre: nombre,
				correo: correo,
			});
		} catch (error) {
			console.log("Hubo el siguiente error al intentar guardar el documento");
			console.log(error);
		}

		cambiarNombre("");
		cambiarCorreo("");
	};

	return (
		<form action="" onSubmit={onSubmit}>
			<Input
				type="text"
				name="nombre"
				value={nombre}
				// el valor e lo usamos para acceder al propio valor del input
				onChange={(e) => cambiarNombre(e.target.value)}
				placeholder="Nombre"
			/>
			<Input
				type="email"
				name="correo"
				value={correo}
				onChange={(e) => cambiarCorreo(e.target.value)}
				placeholder="Correo"
			/>
			<Boton type="submit">Agregar</Boton>
		</form>
	);
};

const Input = styled.input`
	padding: 10px;
	border: 2px solid rgba(0, 0, 0, 0.2);
	border-radius: 3px;
	width: 100%;
	margin-bottom: 10px;
	transition: 0.2s ease all;
	outline: none;
	text-align: center;

	&:focus {
		border: 2px solid #3d76e9;
	}
`;

const Boton = styled.button`
	padding: 10px 30px;
	border: none;
	cursor: pointer;
	border-radius: 3px;
	transition: 0.3s ease all;
	outline: none;
	background: #c4c4c4;
	color: #fff;
	font-size: 12px;

	&:hover {
		background: #3d76e9;
	}
`;

export default FormularioAgregarContacto;
