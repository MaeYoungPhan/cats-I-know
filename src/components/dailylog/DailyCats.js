import { useEffect, useState } from "react";

export const DailyCats = ( {newEntryObject} ) => {

    const [colonyCats, setColonyCats] = useState([])
    const [filteredColonyCats, setFilteredColony] = useState([])
    // const [dailyCatsChecked, setDailyCatsChecked] = useState(new Array(filteredColonyCats.length).fill(false))
    const [dailyCats, setDailyCats] = useState([])

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
            const currentColony = colonyCats.filter(colonyCat => colonyCat.colonyId === newEntryObject.colonyId)
            setFilteredColony(currentColony)
        },
        [colonyCats]
    )

    // const handleOnChange = (position) => {
    //     const updatedCheckedState = dailyCatsChecked.map ((colonyCat, index) => 
    //         index === position ? !colonyCat : colonyCat)

    //         setDailyCatsChecked(updatedCheckedState)
    // }
    
    return <>
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
    </>
}