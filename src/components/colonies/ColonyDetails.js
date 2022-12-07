import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

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
        fetch(`http://localhost:8088/cats/${colonyId}`, {
        method: "DELETE",
    })
        .then(() => {
            navigate("/colonies")
        }) 
    }} className="cat_delete">Delete Colony</button>

}

    return <>
        <div className="profileButtons">
        {deleteButton()}
        </div>
        <article className="colonyProfile">
        <div><img width="150" src={colony.image} /> 
        <header className="cat_header"> {colony.nickname} </header></div>
        <ul>
        <li>Feeding Time: {colony.feedingTime} </li>
        <li>Date Created: {colony.dateCreated} </li>
        <li>Location: {colony.location} </li>
        </ul>

        {/* <UpdateCat catObject={cat} /> */}
        </article>
    </>
}