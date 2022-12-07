import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { UpdateCat } from "./UpdateCat"

export const CatDetails = () => {
    const {catId} = useParams()
    const [cat, setCat] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/cats?id=${catId}`)
            .then(res => res.json())
            .then((data) => {
                const singleCat = data[0]
                setCat(singleCat)
            })
        },
        [catId]
    )

    //ToDo: Function for delete the cat
    const deleteButton = () => {
        return <button onClick={() => {
        fetch(`http://localhost:8088/cats/${catId}`, {
        method: "DELETE",
    })
        .then(() => {
            navigate("/cats")
        }) 
    }} className="cat_delete">Delete Cat</button>

}

    return <>
        <div className="profileButtons">
        <button onClick={() => navigate(`/cat/${cat.id}/edit`)}>Edit Cat</button>
        {deleteButton()}
        </div>
        <article className="catProfile">
        <div><img width="150" src={cat.image} /> 
        <header className="cat_header"> {cat.name} </header></div>
        <ul>
        <li>Found Date: {cat.foundDate} </li>
        <li>Location: {cat.location} </li>
        <li> Spayed/Neutered: {cat.fixed ? "✅" : "❌"} </li>
        <li> Microchipped: {cat.microchip ? "✅" : "❌"} </li>
        <li> Vaccinated: {cat.vaccinated ? "✅" : "❌"} </li>
        <li> Date Vaccinated: {cat.shotDate} </li>
        </ul>

        <UpdateCat catObject={cat} />
        </article>
    </>
}