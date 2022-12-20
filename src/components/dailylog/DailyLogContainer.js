import { useState } from "react"
import { DailyLogList } from "./DailyLogList"
import { DailyLogSearch } from "./DailyLogSearch"

export const DailyLogContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <label className="logSearchLabel">🔎</label> 
        <DailyLogSearch setterFunction={setSearchTerms}/>
        <DailyLogList searchTermState={searchTerms}/>
    </>
}
