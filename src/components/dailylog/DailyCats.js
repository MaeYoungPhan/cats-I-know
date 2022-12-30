import { useEffect, useState } from "react";
import { GiHollowCat } from "react-icons/gi";

export const DailyCats = ( {newEntryObject} ) => {

    const [dailyColonyCats, setDailyColonyCats] = useState([])
    const [filteredDailyCats, setFilteredCats] = useState([])

    useEffect( () => {
        fetch(`http://localhost:8088/dailyColonyCats?_expand=cat`)
            .then(res => res.json())
            .then((dailyCatsArray) => {
                setDailyColonyCats(dailyCatsArray)
            })
    },
    []
    )

    useEffect(
        () => {
            const catsPresent = dailyColonyCats.filter(dailyCat => dailyCat.colonyLogEntryId === newEntryObject.id)
            setFilteredCats(catsPresent)
        },
        [dailyColonyCats]
    )
    
    return <>
        {(filteredDailyCats.length > 0)
        ? filteredDailyCats.map((oneCat) => {
          return <p key={oneCat.id} className="dailyCatDetails">< GiHollowCat /> {oneCat?.cat?.name}</p>
        })
        : <p className="logEntryDetails">No Cats Present</p>
        }
    </>
}