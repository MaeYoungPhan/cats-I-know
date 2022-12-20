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

const timeDisplay = (feedingTime) => { 
    let hours = parseFloat(feedingTime).toFixed(4)

    if(hours>12){
    hours -= 12
    hours += (hours >= 12) ? " P.M." : " A.M."
    return hours
    }
    else{
    hours += (hours >= 12) ? " P.M." : " A.M."
    return hours}

}

    return <>
        <article className="colonyContainer">
        <div className="flip-card-colony">
        <div className="flip-card-inner-colony">
        <div className="flip-card-front-colony">
        <h2 className="colony_header"> {colony.nickname}</h2>
        <img className="colonyImg--details" src={colony.image} />
        </div>
        <div className="flip-card-back-colony">
        <p className="colonyDetails--top">Feeding Time: {timeDisplay(colony.feedingTime)} </p>
        <p className="colonyDetails">Date Created: {colony.dateCreated} </p>
        <p className="colonyDetails">Location: {colony.location} </p>
        </div>
        </div>
        </div>
        <div className="profileButtons">
        <button className="interiorBtn" onClick={() => navigate("/dailylog")}>Create Daily Log Entry</button>
        </div>

        <ColonyCats colonyObject={colony} />
        <ColonyLogEntries colonyObject={colony} />

        <div className="profileButtons">
        {deleteButton()}
        </div>

        </article>
    </>
}