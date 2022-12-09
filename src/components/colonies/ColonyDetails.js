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
    }} className="cat_delete">Delete Colony</button>

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
        <div className="profileButtons">
        <button onClick={() => navigate("/dailylog")}>Create Daily Log Entry</button>
        </div>
        <article className="colonyProfile">
        <div><img width="150" src={colony.image} /> 
        <header className="cat_header"> {colony.nickname} </header></div>
        <ul>
        <li>Feeding Time: {timeDisplay(colony.feedingTime)} </li>
        <li>Date Created: {colony.dateCreated} </li>
        <li>Location: {colony.location} </li>
        </ul>

        <ColonyCats colonyObject={colony} />
        <ColonyLogEntries colonyObject={colony} />

        <div className="profileButtons">
        {deleteButton()}
        </div>

        </article>
    </>
}