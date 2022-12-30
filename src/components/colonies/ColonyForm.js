import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Axios from "axios"

export const ColonyForm = () => {
    
    const [imageSelected, setImageSelected] =useState("")
    const [newColony, updateNewColony] = useState({
                nickname: "",
                location: "",
                feedingTime: "",
                location: "",
                lat: 0,
                long: 0,
                image: ""
        })
    const [searchResults, setResults] = useState([])
    const [text, setText] = useState("")
    
        let navigate = useNavigate()
        const provider = new OpenStreetMapProvider();
    
    const localKittyUser = localStorage.getItem("kitty_user")
    const kittyUserObject = JSON.parse(localKittyUser)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const results = await provider.search({ query: text });
        setResults(results)}

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
            location: newColony.location,
            lat: newColony.lat,
            long: newColony.long,
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
            <input className="form-address-search" type="text" value={text} placeholder="Enter approximate address with zip code" onChange={(e) => setText(e.target.value)}/>
            <button className="interiorBtn" onClick={handleSubmit}>Click to Find Location</button>
            </fieldset>
            <fieldset>
            <div className="form-group">
            <label className="searchResultsLabel" htmlFor="locationFound">Location Found:</label>
                {searchResults.map(item => {
                    return <>
                        <p className="searchResults">{item.label}</p>
                        <input 
                        onChange={(e) => {
                        //add to list code via https://stackoverflow.com/questions/66434403/how-to-get-multiple-checkbox-values-in-react-js
                        if (e.target.checked) {
                            const copy = {...newColony}
                            copy.location = item.label
                            copy.long = item.x
                            copy.lat = item.y
                            updateNewColony(copy)
                        } else {
                            //remove from list
                            const copy = {...newColony}
                            copy.location = ""
                            copy.long = 0
                            copy.lat = 0
                            updateNewColony(copy)
                            window.alert("Please accept a valid address to continue or search again.")
                        }}}
                        type="checkbox"
                        key={item.id}
                        /><label className="acceptLocation" htmlFor="acceptLocation">Accept Location?</label></>
                    })}
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
