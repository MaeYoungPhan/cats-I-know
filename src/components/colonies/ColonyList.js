import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Colonies.css"

export const ColonyList = () => {
    const [colonies, setColonies] = useState([])
    const [filteredColonies, setFiltered] = useState([])

    const navigate = useNavigate()

    const localKittyUser = localStorage.getItem("kitty_user")
    const kittyUserObject = JSON.parse(localKittyUser)

    const getAllColonies = () => {
        fetch(`http://localhost:8088/colonies`)
            .then(res => res.json())
            .then((coloniesArray) => {
                setColonies(coloniesArray)
            })
    }

    useEffect(
        () => {
            getAllColonies()
        },
        []
    )

    useEffect(
        () => {
            const myColonies = colonies.filter(colony => colony.userId === kittyUserObject.id)
            setFiltered(myColonies.sort((a,b) => {const nameA = a.nickname;
                const nameB = b.nickname; if (nameA < nameB){ return -1;} if (nameA > nameB) {return 1;} return 0}))
        },
        [colonies]
    )

    return <>
    <article className="catContainer">

    <h2 className="colonyHeader">My Colonies</h2>

    <p className="addColony"><button className="interiorBtn" onClick={ () => navigate("/colony/add")}>Add a Colony</button></p>

    <article className="colonies">
        {
            filteredColonies.map(
                (colony) => {
                return <div className="colonyDiv" key={colony.id}>
                    <img className="colonyImg" src={colony.image} />
                    <p className="colonyLink--P"><Link className="colonyLink" to={`/colony/${colony.id}`}>{colony.nickname}</Link></p>
                    <footer className="colonyTime">Feeding Time: {colony.feedingTime}</footer>
                </div>}
            )
        }
    </article>
    </article>
    </>

}