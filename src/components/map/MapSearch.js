import React, {useState} from 'react'
import {OpenStreetMapProvider} from 'leaflet-geosearch'

export const MapSearch = () => {
      const provider = new OpenStreetMapProvider();
      const [searchResults, setResults] = useState([])
      const [text, setText] = useState("")

      const handleSubmit = async (e) => {
      e.preventDefault()
      const results = await provider.search({ query: text });
      setResults(results)
      
  }
  return (
    <>
     <fieldset>
     <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
     <button className="interiorBtn" onClick={handleSubmit}>Get Location</button></fieldset>
     <div>
      {searchResults.map(item => <p>{item.label}</p>)}
     </div>
    </>
   )
}