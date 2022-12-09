import { useState } from "react"
import { DailyLogList } from "./DailyLogList"
import { DailyLogSearch } from "./DailyLogSearch"

export const DailyLogContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <label>Search Entries:</label> 
        <DailyLogSearch setterFunction={setSearchTerms}/>
        <DailyLogList searchTermState={searchTerms}/>
    </>
}
