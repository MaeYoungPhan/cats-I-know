import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ColonyCats } from "./ColonyCats"
import { ColonyLogEntries } from "./ColonyLogEntries"

export const ColonyDetails = () => {
    const {colonyId} = useParams()
    const [colony, setColony] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/colonies?id=${colonyId}`)
            .then(res => res.json())
            .then((data) => {
                const singleColony = data[0]
                setColony(singleColony)
            })
        },
        [colonyId]
    )

    //ToDo: Function for delete the cat
    const deleteButton = () => {
        return <button onClick={() => {
        fetch(`http://localhost:8088/colonies/${colonyId}`, {
        method: "DELETE",
    })
        .then(() => {
            navigate("/colonies")
        }) 
    }} className="deleteBtn">Delete Colony</button>

}

    return <>
        <article className="colonyContainer">
        <div className="colony-card">
        <div className="colony-card-left">
        <h2 className="colony_header"> {colony.nickname}</h2>
        <img className="colonyImg--details" src={colony.image} />
        </div>
        <div className="colony-card-right">
        <p className="colonyDetails--top">🕑 Feeding Time: {colony.feedingTime} </p>
        <p className="colonyDetails">🎂 Date Created: {colony.dateCreated} </p>
        <p className="colonyDetails">📍 Location: {colony.location} </p>
        </div>
        </div>
        <div className="profileButtons">
        <button className="interiorBtn" onClick={() => navigate("/dailylog")}>Create Daily Log Entry</button>
        <button className="interiorBtn colonyEditBtn" onClick={() => navigate(`/colony/${colony.id}/edit`)}>Edit Colony</button>
        </div>

        <ColonyCats colonyObject={colony} />
        <ColonyLogEntries colonyObject={colony} />

        <div className="profileButtons">
        {deleteButton()}
        </div>

        </article>
    </>
}