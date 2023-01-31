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

    const deleteButton = () => {
        return <button onClick={() => {
        fetch(`http://localhost:8088/cats/${catId}`, {
        method: "DELETE",
    })
        .then(() => {
            navigate("/cats")
        }) 
    }} className="deleteBtn deleteCat">Delete Cat</button>

}

    return <>
        <article className="catProfile">
        <div className="flip-card">
        <div className="flip-card-inner">
        <div className="flip-card-front">
        <h2 className="cat_header"> {cat.name} </h2>
        <img className="catImg--details" src={cat.image} />
        </div>
        <div className="flip-card-back">
        <p className="catDetails--top">Found Date:{cat.foundDate} </p>
        <p className="catDetails">Location: {cat.location} </p>
        <p className="catDetails"> Spayed/Neutered: {cat.fixed ? "☑️" : "❌"} </p>
        <p className="catDetails"> Microchipped: {cat.microchip ? "☑️" : "❌"} </p>
        <p className="catDetails"> Vaccinated: {cat.vaccinated ? "☑️" : "❌"} </p>
        <p className="catDetails"> Date Vaccinated: {cat.shotDate} </p>
        <p><button className="picEditBtn" onClick={() => navigate(`/cat/${cat.id}/editpic`)}>Edit Profile Picture</button></p>
        </div>
        </div>
        </div>
        <div className="profileButtons">
        <button className="interiorBtn" onClick={() => navigate(`/cat/${cat.id}/edit`)}>Edit Cat</button>
        {deleteButton()}
        </div>

        <UpdateCat catObject={cat} />
        </article>
    </>
}