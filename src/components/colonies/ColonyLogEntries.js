import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const ColonyLogEntries = ( {colonyObject} ) => {
    const [colonyLogEntries, setColonyLogEntries] = useState([])
    const [filteredEntries, setFiltered] = useState([])

    const localKittyUser = localStorage.getItem("kitty_user")
    const kittyUserObject = JSON.parse(localKittyUser)

    const getAllEntries = () => {
        fetch(`http://localhost:8088/colonyLogEntries?_expand=colony`)
            .then(res => res.json())
            .then((logArray) => {
                setColonyLogEntries(logArray)
            })
    }

    useEffect(
        () => {
            getAllEntries()
        },
        []
    )

    useEffect(
        () => {
            const currentColonyEntries = colonyLogEntries.filter(entry => entry.userId === kittyUserObject.id && entry.colonyId === colonyObject.id)
            setFiltered(currentColonyEntries.sort(function(a,b){ return new Date(b.date) - new Date(a.date)}))
        },
        [colonyLogEntries]
    )

    return <>

    <h2 className="colonyEntriesHeader">Recent Visits</h2>

    <article className="colonyEntriesContainer">
        {
            filteredEntries.map(
                (entry) => {
                return <div className="entryDiv" key={entry.id}>
                    <p className="entryDetails--top">Visit Date:</p>
                    <p className="entryDetails">{entry.date}</p>
                    <p className="entryDetails">{entry?.colony?.nickname}</p>
                    <p className="entryDetails"> Fed: {entry.food ? "✅" : "❌"} </p>
                    <p className="entryDetails"> Watered: {entry.water ? "✅" : "❌"} </p></div>}
            )
        }
    </article>
    </>

}