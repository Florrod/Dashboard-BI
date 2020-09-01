import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/salesTable.scss";

const ENDPOINT = "https://3000-c3bf5342-eaa7-49f5-b2d2-925fab673d60.ws-us02.gitpod.io";

export const ClientTable = props => {
	const [platforms, setPlatforms] = useState({
		//initialize state here
	});

	const getRecurrentClients = () => {
		let access_token = localStorage.getItem("access_token");
		return fetch(`${ENDPOINT}/recurrent-clients`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
				"Access-Control-Allow-Origin": "*"
			}
		})
			.then(res => res.json())
			.then(platforms => {
				setPlatforms(platforms);
			});
	};

	useEffect(() => {
		getRecurrentClients();
	}, []);

	if (platforms == null || platforms[0] == null) return <p className="text-center">Estamos cargando tus datos</p>;

	return (
		<div className="table-responsive-sm">
			<table className="table table-sm table-hover mt-5 text-center">
				<tbody>
					<div className="row">
						<div className="col-6">
							<div className="row">
								<div className="col-6 h5">Plataformas</div>
								<div className="col-6 h5">Clientes recurrentes</div>
							</div>
							{platforms
								? platforms.map((plat, index) => (
										<div className="row" key={plat.id}>
											<div className="col-6">{plat.name}</div>
											{plat.orders_count.map((contact, index) => (
												<div key={index} className="col-6 text-center">
													{" "}
													{contact.phone}
													{contact.customer_id_platform}
												</div>
											))}
										</div>
								  ))
								: ""}
						</div>
					</div>
				</tbody>
			</table>
		</div>
	);
};
