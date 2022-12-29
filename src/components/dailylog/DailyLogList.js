import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { DailyLogForm } from "./DailyLogForm"
import { DailyCats } from "./DailyCats"
import Collapsible from 'react-collapsible'
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
            setFiltered(myEntries.sort(function(a,b){ return new Date(b.date) - new Date(a.date)}))
        },
        [colonyLogEntries]
    )

    return <>
    <section className="logContainer">
    <DailyLogForm getAllEntries= {getAllEntries} />

    <article className="entries">

    <h2 className="logEntriesHeader">Recent Entries</h2>

        {
            filteredEntries.map(
                (entry) => {

                return <div className="logEntryDiv" key={entry.id}>
                    <p className="logEntryDetails--top"><Link to={`/colony/${entry.colonyId}`}>{entry?.colony?.nickname}</Link></p>
                    <p className="logEntryDetails">Visit Date:</p> 
                    <p className="logEntryDetails">{entry.date}</p>
                    <Collapsible className="collapsible" openedClassName="collapsibleOpen" trigger="Cats Present ⌄"><DailyCats newEntryObject={entry}/></Collapsible>
                    <p className="logEntryDetails"> Fed: {entry.food ? "✅" : "❌"} </p>
                    <p className="logEntryDetails"> Watered: {entry.water ? "✅" : "❌"} </p>
                    <button onClick={() => {
                     fetch(`http://localhost:8088/colonyLogEntries/${entry.id}`, {
                     method: "DELETE",
                     })
                     .then(() => {
                     {getAllEntries()}
                      }) 
                     }} className="deleteBtnLog">Delete Entry</button></div>}
            )
        }
    </article>
    </section>
    </>

}