import { Link } from "react-router-dom"
import colony from "./images/colony.jpg"
import cat from "./images/billy.JPG"
import log from "./images/dailylog.jpg"
import "./dashboard.css"


export const Dashboard = () => {

				return <>
				
					<div><img width="150" className="homeimg" src={cat}/><Link to="/cats">My Cats</Link></div>
					<div><img width="150" className="homeimg" src={log}/><Link to="/dailylog">Daily Log</Link></div>
					<div><img width="150" className="homeimg" src={colony}/><Link to="/colonies">My Colonies</Link></div>
					{/* <div><img width="150" className="homeimg" src={colony}/><Link to="/map">Map</Link></div>	 */}

				</>

}
