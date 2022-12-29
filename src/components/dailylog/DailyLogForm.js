import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
// import { DailyCats } from "./DailyCats"

export const DailyLogForm = ( {getAllEntries} ) => {
    const [colonies, setColonies] = useState([])
    const [filteredColonies, setFiltered] = useState([])
    const [colonyCats, setColonyCats] = useState([])
    const [filteredColonyCats, setFilteredColony] = useState([])
    const [newLogEntry, updateNewLogEntry] = useState({
                colonyId: 0,
                food: false,
                water: false,
                date: ""
        })
        const [dailyCats, setDailyCats] = useState([])
    
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

    useEffect( () => {
        fetch(`http://localhost:8088/colonyCats?_expand=cat`)
            .then(res => res.json())
            .then((colonyCatArray) => {
                setColonyCats(colonyCatArray)
            })
    },
    []
    )

    useEffect(
        () => {
            const currentColony = colonyCats.filter(colonyCat => colonyCat.colonyId === newLogEntry.colonyId)
            setFilteredColony(currentColony)
        },
        [colonyCats, newLogEntry]
    )

    
    const handleSaveEntry = (e) => {
        e.preventDefault()

        const entryToSendToAPI = {
            userId: kittyUserObject.id,
            colonyId: newLogEntry.colonyId,
            food: newLogEntry.food,
            water: newLogEntry.water,
            date: newLogEntry.date
        }

        return fetch(`http://localhost:8088/colonyLogEntries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryToSendToAPI)
        })
        .then(res => res.json())
        .then(entryResData => {
            if (entryResData.hasOwnProperty("id") && dailyCats.length > 0) {
                dailyCats.forEach(cat => {
                    return fetch(`http://localhost:8088/dailyColonyCats`, {
                    method: "POST",
                    headers: {
                "Content-Type": "application/json"
                 },
                 body: JSON.stringify({
                colonyLogEntryId: entryResData.id,
                catId: cat.catId
            })
            })
            })
            }
            else {
                (getAllEntries())
            }
        })
        }

    return (
        <form className="newEntryForm">
            <h2 className="entryForm_title">New Daily Log Entry</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="colony">Colony:</label>
                    <select required autoFocus className="colonyListLog" onChange={
                        (evt) => {
                            const copy = { ...newLogEntry }
                            copy.colonyId = parseInt(evt.target.value)
                            updateNewLogEntry(copy)
                        }
                    }
                    ><option name="colonyListLog" value="">Colony</option>
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
            {/* <div>
            <DailyCats newEntryObject={newLogEntry} />
            </div> */}
            <fieldset>
            <div className="form-group">
            <label htmlFor="dailyCats">Cats Present:</label>
                {filteredColonyCats.map(colonyCat => {
                    return <><label htmlFor="dailyCats">{colonyCat?.cat.name}</label>
                        <input 
                        onChange={(e) => {
                        //add to list
                        if (e.target.checked) {
                            setDailyCats([
                                ...dailyCats,
                                {
                                    catId: colonyCat?.cat?.id,
                                },
                            ])
                        } else {
                            //remove from list
                        setDailyCats(
                            dailyCats.filter((cat) => cat.id !== colonyCat?.cat?.id),
                        )
                        }}}
                        type="checkbox"
                        id={`checkbox-${colonyCat.id}`}
                        name={colonyCat?.cat?.name}
                        value={colonyCat.cat.id}
                        /></>
                    })}
            </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="food">Received Food: </label>
                    <input type="checkbox" 
                        value={newLogEntry.food}
                        onChange={
                            (evt) => {
                                const copy = {...newLogEntry}
                                copy.food = evt.target.checked
                                updateNewLogEntry(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="water">Received Water: </label>
                    <input type="checkbox" 
                        value={newLogEntry.water}
                        onChange={
                            (evt) => {
                                const copy = {...newLogEntry}
                                copy.water = evt.target.checked
                                updateNewLogEntry(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Entry Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-ctrl-log"
                        placeholder="MM/DD/YYYY"
                        defaultValue={newLogEntry.date}
                        onChange={
                            (evt) => {
                                const copy = {...newLogEntry}
                                copy.date = evt.target.value
                                updateNewLogEntry(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
            onClick = {(clickEvent) => handleSaveEntry(clickEvent)}
            className="interiorBtn">
                Submit Entry
            </button>
        </form>
    )
}