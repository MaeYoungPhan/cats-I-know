import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Axios from "axios"

export const ColonyForm = () => {
    
    const [imageSelected, setImageSelected] =useState("")
    const [newColony, updateNewColony] = useState({
                nickname: "",
                feedingTime: "",
                image: ""
        })
    
        let navigate = useNavigate()
    
    const localKittyUser = localStorage.getItem("kitty_user")
    const kittyUserObject = JSON.parse(localKittyUser)

    
    const handleSaveColony = (e) => {
        e.preventDefault()

        //Upload image to Cloudinary platform. Tutorial https://www.youtube.com/watch?v=Y-VgaRwWS3o
        const formData = new FormData()
        //Constructing the form data - add the imported file and upload preset
        formData.append("file", imageSelected)
        formData.append("upload_preset", "cattracker")

        //Use Axios API to post photo to Cloudinary platform
        Axios.post("https://api.cloudinary.com/v1_1/dungnytvx/image/upload", formData)
            .then(response => {
            const colonyToSendToAPI = {
            userId: kittyUserObject.id,
            nickname: newColony.nickname,
            location: "getCurrentPosition()",
            feedingTime: newColony.feedingTime,
            dateCreated: newColony.dateCreated,
            image: response.data.url
        }

        return fetch(`http://localhost:8088/colonies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(colonyToSendToAPI)
        })
        .then(res => res.json())
        .then(() => {
            navigate("/colonies")
        })
        
    })}

    return (
        <form className="newCatForm">
            <h2 className="catForm_title">Add A Colony</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="nickname">Nickname:</label>
                    <input
                    required autoFocus
                    type="text"
                    className="form-ctrl-edit"
                    placeholder="Name this colony"
                    value={newColony.nickname}
                    onChange={
                        (evt) => {
                            const copy = {...newColony}
                            copy.nickname = evt.target.value
                            updateNewColony(copy)
                        }
                    } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Feeding Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-ctrl-edit"
                        placeholder=""
                        value={newColony.feedingTime}
                        onChange={
                            (evt) => {
                                const copy = {...newColony}
                                copy.feedingTime = evt.target.value
                                updateNewColony(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Today's Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-ctrl-edit"
                        placeholder="MM/DD/YYYY"
                        defaultValue={newColony.dateCreated}
                        onChange={
                            (evt) => {
                                const copy = {...newColony}
                                copy.dateCreated = evt.target.value
                                updateNewColony(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        required autoFocus
                        type="file"
                        className="fileUpload"
                        onChange={
                            (evt) => {
                                setImageSelected(evt.target.files[0])
                            }
                        } 
                        />
                </div>
            </fieldset>
            <button 
            onClick = {(clickEvent) => handleSaveColony(clickEvent)}
            className="interiorBtn">
                Create Colony
            </button>
        </form>
    )
}
