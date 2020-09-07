import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, Redirect } from "react-router-dom";
import "../../styles/home.scss";

const ENDPOINT = "https://3000-e235e552-6019-4406-9dae-b6e1d0b739af.ws-eu01.gitpod.io";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);
	const params = useParams();

	const sendLogOutToServer = token => {
		let access_token = localStorage.getItem("access_token");
		return fetch(`${ENDPOINT}/logout`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
				"Access-Control-Allow-Origin": "*"
			}
		})
			.then(res => {
				actions.logout();
			})
			.catch(error => actions.logout());
	};

	const getBrandName = brandId => {
		console.log("Soy brandId en la funcion getBrand", brandId);
		for (let enterprise of store.allData) {
			for (let brand of enterprise.brand_id) {
				if (brand.id == brandId) {
					return brand.name;
				}
			}
		}
	};
	useEffect(
		() => {
			console.log(`Soy params.brandId ${params.brandId}, soy params.brandid ${params.brandid}`);
		},
		[params]
	);

	return (
		<>
			{store.token != "" && (
				<div className="container-fluid navBar">
					<nav id="navbar-example2" className="navbar navbar-light">
						{store.brandId ? (
							getBrandName(store.brandId)
						) : // <div className="navIdentifier">{store.brandId}</div>
						store.admin ? (
							<div className="navIdentifier">Administrador</div>
						) : (
							store.currentEnterprise && (
								<div className="navIdentifier">{store.currentEnterprise.name}</div>
							)
						)}
						<div className="row">
							<div className="profile pr-0 col">
								<i className="icon fas fa-user-circle" />
							</div>
							<div
								type="button"
								className="dropdown-toggle mt-2 col"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false">
								Menu
							</div>
							<div className="dropdown-menu dropdown-menu-right">
								<Link to="/companyList">
									<button className="dropdown-item" type="button">
										Mi panel
									</button>
								</Link>
								<Link to="/">
									<button onClick={sendLogOutToServer} className="dropdown-item" type="button">
										Cerrar sesión
									</button>
								</Link>
							</div>
						</div>
					</nav>
				</div>
			)}
			<>{store.token == "" && <Redirect to="/" />}</>
		</>
	);
};
