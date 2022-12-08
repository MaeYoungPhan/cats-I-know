import { Route, Routes, Link } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import colony from "./images/colony.jpg"
import cat from "./images/billy.JPG"
import log from "./images/dailylog.jpg"
import "./CatsIKnow.css"


export const CatsIKnow = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				<div><img width="150" className="homeimg" src={cat}/><Link to="/cats">My Cats</Link></div>
				<div><img width="150" className="homeimg" src={log}/><Link to="/dailylog">Daily Log</Link></div>
				<div><img width="150" className="homeimg" src={colony}/><Link to="/colonies">My Colonies</Link></div>
				{/* <div><img width="150" className="homeimg" src={colony}/><Link to="/map">Map</Link></div>	 */}
				</>
			</Authorized>

		} />
	</Routes>
}

