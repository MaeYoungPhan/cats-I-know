import { Link } from "react-router-dom"
import colony from "./images/colony.jpg"
import cat from "./images/billy.JPG"
import log from "./images/dailylog.jpg"
import catMap from "./images/catMap.png"
import "./dashboard.css"


export const Dashboard = () => {

				return <>
					<div className="dashHeader">
					<h1>Cats I Know</h1>
					<div className="dashLogLine">Community cat management and observation</div>
					</div>
					<section className="dashMain">
					<div className="dashDiv"><img className="dashImg" src={cat}/><Link className="dashLink" to="/cats">My Cats</Link></div>
					<div className="dashDiv"><img className="dashImg" src={log}/><Link className="dashLink" to="/dailylog">Daily Log</Link></div>
					<div className="dashDiv"><img className="dashImg" src={colony}/><Link className="dashLink" to="/colonies">My Colonies</Link></div>
					<div className="dashDiv"><img className="dashImg" src={catMap}/><Link className="dashLink" to="/map">Map</Link></div>
					</section>
				</>

}
