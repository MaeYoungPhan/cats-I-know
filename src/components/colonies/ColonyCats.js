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

    <h2>{colonyObject.nickname} Colony Cats</h2>

    <article className="cats">
        {
            filteredColonyCats.map(
                (colonyCat) => {
                return <div className="cat" key={colonyCat?.cat?.id}>
                    <img width="150" src={colonyCat?.cat?.image} />
                    <Link to={`/cat/${colonyCat?.cat?.id}`}>{colonyCat?.cat?.name}</Link>
                </div>}
            )
        }
    </article>
    </>
}