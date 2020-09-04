import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const ENDPOINT = "https://3000-afee9549-6454-4158-a803-5e3e769585c3.ws-eu01.gitpod.io";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({});
	// const [loggedIn, setLoggedIn] = useState(false);

	// const handleLogOut = e => {
	// 	e.preventDefault();
	// 	setLoggedIn(null);
	// };

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

	return (
		<div className="container-fluid">
			<nav id="navbar-example2" className="navbar navbar-light bg-light">
				{/* {store.allData.map((brand, index) => (
					<div className="navbar-brand" key={brand.id}>
						{brand.name}
					</div>
				))} */}
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
	);
};
