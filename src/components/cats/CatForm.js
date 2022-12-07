import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const CatForm = () => {
    const [colonies, setColonies] = useState([])
    const [filteredColonies, setFiltered] = useState([])
    const [newColonyCat, updateNewColonyCat] = useState({})
    const [newCat, updateNewCat] = useState({
            name: "",
            foundDate: "",
            fixed: false,
            microchip: false,
            vaccinated: false,
            shotDate: "",
            notes: "",
            image: ""
    })

    let navigate = useNavigate()

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

    const handleSaveCat = (e) => {
        e.preventDefault()

        const catToSendToAPI = {
            userId: kittyUserObject.id,
            name: newCat.name,
            foundDate: newCat.foundDate,
            location: "newCat.getCurrentPosition()",
            fixed: newCat.fixed,
            microchip: newCat.microchip,
            vaccinated: newCat.vaccinated,
            shotDate: newCat.shotDate,
            isOut: false,
            outReason: "",
            notes: newCat.notes,
            image: newCat.image
        }

        const colonyCatToSendToAPI = {
            catId: newColonyCat.catId,
            colonyId: newColonyCat.colonyId
        }

        return fetch(`http://localhost:8088/cats`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(catToSendToAPI)
        })
        .then(res => res.json())
        .then(cat => {
            newColonyCat.catId = cat.id
            return fetch(`http://localhost:8088/colonyCats`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(colonyCatToSendToAPI)
            })
        })
        .then(() => {
            navigate("/cats")
        })
    }

    return (
        <form className="newCatForm">
            <h2 className="catForm_title">Add A Cat</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="name">Name:</label>
                    <input
                    required autoFocus
                    type="text"
                    className="form-control"
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
                        type="datetime-local"
                        className="form-control"
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Shot Date:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
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
                    className="form-control"
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
                        type="text"
                        className="form-control"
                        placeholder="Picture URL"
                        value={newCat.image}
                        onChange={
                            (evt) => {
                                const copy = {...newCat}
                                copy.image = evt.target.value
                                updateNewCat(copy)
                            }
                        } />
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
                    ><option name="colonyList" className="form-control" value="">Add to Colony</option>
                        {filteredColonies.map(colony => {
                                return <option
                                    name="colonyList"
                                    className="form-control"
                                    value={colony.id}
                                    key={`location--${colony.id}`}
                                >{colony.nickname}</option>
                            }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <button 
            onClick = {(clickEvent) => handleSaveCat(clickEvent)}
            className="btn btn-primary">
                Add Cat
            </button>
        </form>
    )
}