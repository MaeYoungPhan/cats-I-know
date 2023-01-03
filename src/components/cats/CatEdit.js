import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const CatEdit = () => {
    const {catId} = useParams()
    const [colonies, setColonies] = useState([])
    const [currentCatColony, setCurrentColony] = useState([])
    const [filteredColonies, setFiltered] = useState([])
    const [colonyCat, setColonyCat] = useState({
        colonyId: 0
    })
    const [cat, setCat] = useState({
        name: "",
        foundDate: "",
        fixed: false,
        microchip: false,
        vaccinated: false,
        shotDate: "",
    })

    const navigate = useNavigate()

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
            fetch(`http://localhost:8088/colonyCats?_expand=colony&catId=${catId}`)
            .then(res => res.json())
            .then((colonyCatArr) => {
            const singleColony = colonyCatArr[0]
            setCurrentColony(singleColony)
        })
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

    const currentColony = () => {
        if (currentCatColony) {
            return `${cat.name} is currently in ${currentCatColony?.colony?.nickname}`}
        else {
            return ""
        }}
    
    const deleteFromCurrentColony = () => {
        if (currentCatColony) {
        return <button onClick={() => {
            fetch(`http://localhost:8088/colonyCats/${currentCatColony.id}`, {
            method: "DELETE",
            })
            .then(() => {
            navigate(`/cat/${cat.id}/edit`)
             }) 
            }} className="deleteBtn">Remove Cat from Current Colony</button>}
        else {
            return ""
        }
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/cats/${cat.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cat)
        })
        .then(res => res.json())
        .then(catResData => {
            if (catResData.hasOwnProperty("id") && colonyCat.colonyId > 0) {
                return fetch(`http://localhost:8088/colonyCats`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                catId: catResData.id,
                colonyId: colonyCat.colonyId
            })
            })
        .then(navigate(`/cat/${catId}`))
            }
            else {
                navigate(`/cat/${catId}`)
            }
        })
        
    }

    return (<form className="newCatForm">
    <h2 className="catForm_title">Edit {cat.name}</h2>
    <fieldset>
        <div className="form-group">
        <label htmlFor="name">Name:</label>
            <input
            required autoFocus
            type="text"
            className="form-ctrl-edit"
            placeholder="Name this cat"
            defaultValue={cat.name}
            onChange={
                (evt) => {
                    const copy = {...cat}
                    copy.name = evt.target.value
                    setCat(copy)
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
                defaultValue={cat.foundDate}
                onChange={
                    (evt) => {
                        const copy = {...cat}
                        copy.foundDate = evt.target.value
                        setCat(copy)
                    }
                } />
        </div>
    </fieldset>
    <section className = "checkboxes">
    <fieldset>
        <div className="form-group">
            <label htmlFor="fixed">Spayed/Neutered:</label>
            <input type="checkbox" 
                checked={cat.fixed}
                onChange={
                    (evt) => {
                        const copy = {...cat}
                        copy.fixed = evt.target.checked
                        setCat(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="microchip">Microchipped:</label>
            <input type="checkbox" 
                checked={cat.microchip}
                onChange={
                    (evt) => {
                        const copy = {...cat}
                        copy.microchip = evt.target.checked
                        setCat(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="vaccinated">Vaccinated:</label>
            <input type="checkbox" 
                checked={cat.vaccinated}
                onChange={
                    (evt) => {
                        const copy = {...cat}
                        copy.vaccinated = evt.target.checked
                        setCat(copy)
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
                defaultValue={cat.shotDate}
                onChange={
                    (evt) => {
                        const copy = {...cat}
                        copy.shotDate = evt.target.value
                        setCat(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="currentColony">{currentColony()}</div>
        <div>{deleteFromCurrentColony()}</div>
        <div className="form-group">
        <label className="colonyListLabel" htmlFor="colony">Colony:</label>
            <select required autoFocus className="colonyList" onChange={
                (evt) => {
                    if (currentCatColony) {
                        window.alert("Cats can only be place in one colony. Remove cat from current colony to place in a new one.")
                    } else {
                    const copy = { ...colonyCat }
                    copy.colonyId = parseInt(evt.target.value)
                    setColonyCat(copy)}
                }
            }
            ><option name="colonyList" className="form-control" defaultValue="">Add to Colony</option>
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
    onClick = {(clickEvent) => handleSaveButtonClick(clickEvent)}
    className="interiorBtn">
        Save Changes
    </button>
</form>)
}