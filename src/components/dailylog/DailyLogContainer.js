import { useState } from "react"
import { DailyLogForm } from "./DailyLogForm"
import { DailyLogList } from "./DailyLogList"
import { DailyLogSearch } from "./DailyLogSearch"

export const DailyLogContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <DailyLogForm />
        <label>Search Entries:</label> 
        <DailyLogSearch setterFunction={setSearchTerms}/>
        <DailyLogList searchTermState={searchTerms}/>
    </>
}
