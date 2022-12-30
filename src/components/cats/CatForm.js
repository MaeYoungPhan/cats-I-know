import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Axios from "axios"

export const CatForm = () => {
    const [colonies, setColonies] = useState([])
    const [filteredColonies, setFiltered] = useState([])
    const [newColonyCat, updateNewColonyCat] = useState({
        colonyId: 0
    })
    const [imageSelected, setImageSelected] =useState("")
    const [searchResults, setResults] = useState([])
    const [text, setText] = useState("")
    const [newCat, updateNewCat] = useState({
            name: "",
            foundDate: "",
            location: "",
            lat: 0,
            long: 0,
            fixed: false,
            microchip: false,
            vaccinated: false,
            shotDate: "",
            notes: "",
            image: ""
    })

    let navigate = useNavigate()
    const provider = new OpenStreetMapProvider();

    const localKittyUser = localStorage.getItem("kitty_user")
    const kittyUserObject = JSON.parse(localKittyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/colonies`)
            .then(res => res.json())
            .then((colonyArr) => setColonies(colonyArr))
        },
        []
    )

    useEffect(
        () => {
            const currentUserColonies = colonies.filter(colony => {
                return colony.userId === kittyUserObject.id
            })
            setFiltered(currentUserColonies)
        },
        [colonies]
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        const results = await provider.search({ query: text });
        setResults(results)}

    const handleSaveCat = (e) => {
        e.preventDefault()

        //Upload image to Cloudinary platform. Tutorial https://www.youtube.com/watch?v=Y-VgaRwWS3o
        const formData = new FormData()
        //Constructing the form data - add the imported file and upload preset
        formData.append("file", imageSelected)
        formData.append("upload_preset", "cattracker")

        //Use Axios API to post photo to Cloudinary platform
        Axios.post("https://api.cloudinary.com/v1_1/dungnytvx/image/upload", formData)
            .then(response => {
            const catToSendToAPI = {
            userId: kittyUserObject.id,
            name: newCat.name,
            foundDate: newCat.foundDate,
            location: newCat.location,
            lat: newCat.lat,
            long: newCat.long,
            fixed: newCat.fixed,
            microchip: newCat.microchip,
            vaccinated: newCat.vaccinated,
            shotDate: newCat.shotDate,
            isOut: false,
            outReason: "",
            notes: newCat.notes,
            image: response.data.url
        }

        return fetch(`http://localhost:8088/cats`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(catToSendToAPI)
        })
        .then(res => res.json())
        .then(catResData => {
            if (catResData.hasOwnProperty("id") && newColonyCat.colonyId > 0) {
                return fetch(`http://localhost:8088/colonyCats`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                catId: catResData.id,
                colonyId: newColonyCat.colonyId
            })
            })
            }
            else {
                navigate("/cats")
            }
        })
        
    })}

    return (
        <form className="newCatForm">
            <h2 className="catForm_title">Add A Cat</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="name">Name:</label>
                    <input
                    required autoFocus
                    type="text"
                    className="form-ctrl-edit"
                    placeholder="Name this cat"
                    value={newCat.name}
                    onChange={
                        (evt) => {
                            const copy = {...newCat}
                            copy.name = evt.target.value
                            updateNewCat(copy)
                        }
                    } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Found Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-ctrl-edit"
                        placeholder="MM/DD/YYYY"
                        value={newCat.foundDate}
                        onChange={
                            (evt) => {
                                const copy = {...newCat}
                                copy.foundDate = evt.target.value
                                updateNewCat(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
            <input className="form-address-search" type="text" value={text} placeholder="Enter approximate address with zip code" onChange={(e) => setText(e.target.value)}/>
            <button className="interiorBtn" onClick={handleSubmit}>Click to Set Location</button></fieldset>
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
                            const copy = {...newCat}
                            copy.location = item.label
                            copy.long = item.x
                            copy.lat = item.y
                            updateNewCat(copy)
                        } else {
                            //remove from list
                            const copy = {...newCat}
                            copy.location = ""
                            copy.long = 0
                            copy.lat = 0
                            updateNewCat(copy)
                            window.alert("Please accept a valid address to continue or search again.")
                        }}}
                        type="checkbox"
                        key={`checkbox-${item.id}`}
                        /><label className="acceptLocation" htmlFor="acceptLocation">Accept Location?</label></>
                    })}
            </div>
            </fieldset>
            <section className = "checkboxes">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fixed">Spayed/Neutered:</label>
                    <input type="checkbox" 
                        value={newCat.fixed}
                        onChange={
                            (evt) => {
                                const copy = {...newCat}
                                copy.fixed = evt.target.checked
                                updateNewCat(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="microchip">Microchipped:</label>
                    <input type="checkbox" 
                        value={newCat.microchip}
                        onChange={
                            (evt) => {
                                const copy = {...newCat}
                                copy.microchip = evt.target.checked
                                updateNewCat(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="vaccinated">Vaccinated:</label>
                    <input type="checkbox" 
                        value={newCat.vaccinated}
                        onChange={
                            (evt) => {
                                const copy = {...newCat}
                                copy.vaccinated = evt.target.checked
                                updateNewCat(copy)
                            }
                        } />
                </div>
            </fieldset>
            </section>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Shot Date:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-ctrl-edit"
                        placeholder="MM/DD/YYYY or none"
                        value={newCat.shotDate}
                        onChange={
                            (evt) => {
                                const copy = {...newCat}
                                copy.shotDate = evt.target.value
                                updateNewCat(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="notes">Notes:</label>
                    <input
                    required autoFocus
                    type="text"
                    className="form-notes-new"
                    placeholder="Notes about this cat"
                    value={newCat.notes}
                    onChange={
                        (evt) => {
                            const copy = {...newCat}
                            copy.notes = evt.target.value
                            updateNewCat(copy)
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
            <fieldset>
                <div className="form-group">
                <label htmlFor="colony">Colony:</label>
                    <select required autoFocus className="colonyList" onChange={
                        (evt) => {
                            const copy = { ...newColonyCat }
                            copy.colonyId = parseInt(evt.target.value)
                            updateNewColonyCat(copy)
                        }
                    }
                    ><option name="colonyList" className="colonyList" value="">Add to Colony</option>
                        {filteredColonies.map(colony => {
                                return <option
                                    name="colonyList"
                                    className="form-control"
                                    value={colony.id}
                                    key={`colony--${colony.id}`}
                                >{colony.nickname}</option>
                            }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <button 
            onClick = {(clickEvent) => handleSaveCat(clickEvent)}
            className="interiorBtn">
                Add Cat
            </button>
        </form>
    )
}