import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/cats">My Cats</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/colonies">My Colonies</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/dailylog">Daily Log</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kitty_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}

