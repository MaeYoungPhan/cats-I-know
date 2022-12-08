import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./DailyLog.css"

export const DailyLogList = ( {searchTermState} ) => {
    const [colonyLogEntries, setColonyLogEntries] = useState([])
    const [filteredEntries, setFiltered] = useState([])
    const [searchedOnly, setSearched] = useState(false)
    const navigate = useNavigate()

    const localKittyUser = localStorage.getItem("kitty_user")
    const kittyUserObject = JSON.parse(localKittyUser)

    useEffect(
        () => {
            const searchedEntries = colonyLogEntries.filter(entry => {
                return entry.userId === kittyUserObject.id && entry?.colony?.nickname.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedEntries)
        },
        [searchTermState]
    )

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
            const myEntries = colonyLogEntries.filter(entry => entry.userId === kittyUserObject.id)
            setFiltered(myEntries.sort(function(a,b){ return new Date(a.foundDate) - new Date(b.foundDate)}))
        },
        [colonyLogEntries]
    )

    return <>

    <h2>Recent Entries</h2>

    <article className="cats">
        {
            filteredEntries.map(
                (entry) => {
                return <div className="entry" key={entry.id}>
                    <Link to={`/colony/${entry.colonyId}`}>{entry?.colony?.nickname}</Link>
                    <p>Visit Date: {entry.date}</p>
                    <p> Fed: {entry.food ? "✅" : "❌"} </p>
                    <p> Watered: {entry.water ? "✅" : "❌"} </p>
                    <button onClick={() => {
                     fetch(`http://localhost:8088/colonyLogEntries/${entry.id}`, {
                     method: "DELETE",
                     })
                     .then(() => {
                     {getAllEntries()}
                      }) 
                     }} className="cat_delete">Delete Entry</button></div>}
            )
        }
    </article>
    </>

}