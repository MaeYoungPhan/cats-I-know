import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from "axios"

export const CatPicEdit = () => {
    const {catId} = useParams()
    const [imageSelected, setImageSelected] =useState([])
    const [cat, setCat] = useState({
        image: ""
    })

    const navigate = useNavigate()

    const localKittyUser = localStorage.getItem("kitty_user")
    const kittyUserObject = JSON.parse(localKittyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/cats/${catId}`)
            .then(res => res.json())
            .then((data) => {
                setCat(data)
            })
        },
        [catId]
    )

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        //Upload image to Cloudinary platform. Tutorial https://www.youtube.com/watch?v=Y-VgaRwWS3o
        const formData = new FormData()
        //Constructing the form data - add the imported file and upload preset
        formData.append("file", imageSelected)
        formData.append("upload_preset", "cattracker")

        //Use Axios API to post photo to Cloudinary platform
        Axios.put("https://api.cloudinary.com/v1_1/dungnytvx/image/upload", formData)
            .then(response => {
            const catImageToSendToAPI = {
            image: response.data.url
        }

        return fetch(`http://localhost:8088/cats/${cat.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(catImageToSendToAPI) //previously was cat as variable from state
        })
        .then(res => res.json())
        .then(() => {
            navigate(`/cat/${catId}`)
        })})}

    return (<form className="ImageEditForm">
    <h2 className="imageForm_title">{cat.name}'s Current Profile Picture</h2>
    <img width="150" src={cat.image} /> 
    <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        required autoFocus
                        type="file"
                        className="form-control"
                        onChange={
                            (evt) => {
                                setImageSelected(evt.target.files[0])
                            }
                        } 
                        />
                </div>
            </fieldset>
            <button 
    onClick = {(clickEvent) => handleSaveButtonClick(clickEvent)}
    className="btn btn-primary">
        Save New Picture
    </button>
    </form>)}