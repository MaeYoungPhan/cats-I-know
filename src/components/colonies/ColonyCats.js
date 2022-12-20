import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export const ColonyCats = ( {colonyObject} ) => {

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
            const currentColony = colonyCats.filter(colonyCat => colonyCat.colonyId === colonyObject.id)
            setFilteredColony(currentColony)
        },
        [colonyCats]
    )
    
    return <>

    <h2 className="colonyCatsHeader">{colonyObject.nickname} Colony Cats</h2>

    <article className="colonyCatsContainer">
        {
            filteredColonyCats.map(
                (colonyCat) => {
                return <div className="colonyCats" key={colonyCat?.cat?.id}>
                    <img className="colonyCatimg" src={colonyCat?.cat?.image} />
                    <p className="colonyCatsLink--P"><Link className="colonyCatsLink" to={`/cat/${colonyCat?.cat?.id}`}>{colonyCat?.cat?.name}</Link></p>
                </div>}
            )
        }
    </article>
    </>
}