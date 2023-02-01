import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

export const ColonyCats = () => {

    const {colonyId} = useParams()
    const [colony, setColony] = useState([])
    const [colonyCats, setColonyCats] = useState([])
    const [filteredColonyCats, setFilteredColony] = useState([])

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
            fetch(`http://localhost:8088/colonies?id=${colonyId}`)
            .then(res => res.json())
            .then((data) => {
                const singleColony = data[0]
                setColony(singleColony)
            })
        },
        [colonyId]
    )

    useEffect(
        () => {
            const currentColony = colonyCats.filter(colonyCat => colonyCat.colonyId === colony.id)
            setFilteredColony(currentColony)
        },
        [colonyCats]
    )
    
    return <>

    <h2 className="colonyCatsHeader">{colony.nickname} Colony Cats</h2>

    <article className="colonyCatsContainer">
        {
            filteredColonyCats.map(
                (colonyCat) => {
                return <div className="colonyCats" key={colonyCat?.cat?.id}>
                    <img className="colonyCatImg" src={colonyCat?.cat?.image} />
                    <p className="colonyCatsLink--P"><Link className="colonyCatsLink" to={`/cat/${colonyCat?.cat?.id}`}>{colonyCat?.cat?.name}</Link></p>
                </div>}
            )
        }
    </article>
    </>
}