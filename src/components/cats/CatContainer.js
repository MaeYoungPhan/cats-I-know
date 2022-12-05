import { useState } from "react"
import { CatList } from "../cats/CatList"
import { CatSearch } from "../cats/CatSearch"

export const CatContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <CatSearch setterFunction={setSearchTerms}/>
        <CatList searchTermState={searchTerms}/>
    </>
}