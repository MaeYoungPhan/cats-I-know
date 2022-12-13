import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import catvideo from "./assets/kittens.mp4"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("kitty_user", JSON.stringify({
                        id: user.id
                    }))

                    navigate("/dashboard")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
                    {/* /*<!-- The video -->*/}
        <video autoPlay loop muted className="myVideo">
        <source src={catvideo} type="video/mp4" />
        </video>
            <section className="content">
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="login--title">Cats I Know</h1>
                    <p className="login--subtitle">Community cat management and observation</p>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                    <fieldset>
                    <Link className="link--register" to="/register">Not a member yet?</Link> 
                    </fieldset>
                </form>
            </section>
        </main>
    )
}

