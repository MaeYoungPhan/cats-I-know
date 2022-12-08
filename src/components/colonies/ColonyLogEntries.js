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
            setFiltered(currentColonyEntries.sort(function(a,b){ return new Date(a.foundDate) - new Date(b.foundDate)}))
        },
        [colonyLogEntries]
    )

    return <>

    <h2>Recent Visits</h2>

    <article className="cats">
        {
            filteredEntries.map(
                (entry) => {
                return <div className="entry" key={entry.id}>
                    <p>Visit Date: {entry.date}</p>
                    <p>{entry?.colony?.nickname}</p>
                    <p> Fed: {entry.food ? "✅" : "❌"} </p>
                    <p> Watered: {entry.water ? "✅" : "❌"} </p></div>}
            )
        }
    </article>
    </>

}

{/* <Link to={`/dailylog/${entry.colonyId}`}></Link> */}