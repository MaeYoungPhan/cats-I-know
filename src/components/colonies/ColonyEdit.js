import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const ColonyEdit = () => {
    const {colonyId} = useParams()
    const [colony, setColony] = useState({
        nickname: "",
        feedingTime: "",
    })

    const navigate = useNavigate()

    const localKittyUser = localStorage.getItem("kitty_user")
    const kittyUserObject = JSON.parse(localKittyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/colonies/${colonyId}`)
            .then(res => res.json())
            .then((data) => {
                setColony(data)
            })
        },
        [colonyId]
    )
    

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/colonies/${colony.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(colony)
        })
        .then(res => res.json())
        .then(() => {
            navigate(`/colony/${colonyId}`)
        })
        }

    return (<form className="newCatForm">
    <h2 className="catForm_title">Edit {colony.name}</h2>
    <fieldset>
        <div className="form-group">
        <label htmlFor="name">Nickname:</label>
            <input
            required autoFocus
            type="text"
            className="form-ctrl-edit"
            placeholder="Name this cat"
            defaultValue={colony.nickname}
            onChange={
                (evt) => {
                    const copy = {...colony}
                    copy.nickname = evt.target.value
                    setColony(copy)
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
                        defaultValue={colony.feedingTime}
                        onChange={
                            (evt) => {
                                const copy = {...colony}
                                copy.feedingTime = evt.target.value
                                setColony(copy)
                            }
                        } />
                </div>
            </fieldset>
    <button 
    onClick = {(clickEvent) => handleSaveButtonClick(clickEvent)}
    className="interiorBtn">
        Save Changes
    </button>
</form>)
}