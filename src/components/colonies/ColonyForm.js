import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const ColonyForm = () => {
    
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

        const colonyToSendToAPI = {
            userId: kittyUserObject.id,
            nickname: newColony.nickname,
            location: "getCurrentPosition()",
            feedingTime: newColony.feedingTime,
            dateCreated: newColony.dateCreated,
            image: newColony.image
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
        
    }

    return (
        <form className="newCatForm">
            <h2 className="catForm_title">Add A Colony</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="nickname">Nickname:</label>
                    <input
                    required autoFocus
                    type="text"
                    className="form-control"
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
                        className="form-control"
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
                        className="form-control"
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
                        type="text"
                        className="form-control"
                        placeholder="Picture URL"
                        value={newColony.image}
                        onChange={
                            (evt) => {
                                const copy = {...newColony}
                                copy.image = evt.target.value
                                updateNewColony(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
            onClick = {(clickEvent) => handleSaveColony(clickEvent)}
            className="btn btn-primary">
                Create Colony
            </button>
        </form>
    )
}
