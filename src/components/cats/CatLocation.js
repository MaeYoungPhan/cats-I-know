import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom"
import {OpenStreetMapProvider} from 'leaflet-geosearch'

export const CatLocation = () => {
      const provider = new OpenStreetMapProvider();
      const {catId} = useParams()
      const [cat, setCat] = useState([])
      const [searchResults, setResults] = useState({
        label: "",
        x: 0,
        y: 0,
      })
      const [text, setText] = useState("")

      let navigate = useNavigate()

      useEffect(
        () => {
            fetch(`http://localhost:8088/cats/${catId}`)
            .then(res => res.json())
            .then((data) => {
                setCat(data)
            })
        },
        [catId]
    )

      const handleSubmit = async (e) => {
      e.preventDefault()
      const results = await provider.search({ query: text });
      setResults(results)

      const locationToSendToAPI = {
            location: searchResults.label,
            lat: searchResults.y,
            long: searchResults.x,
      }

      return fetch(`http://localhost:8088/cats/${catId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationToSendToAPI)
        })
        .then (res => res.json())
        .then(() => {
            navigate("/cats")
        })
    }
      
  return (
    <>
     <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
     </form>
     {/* <div>
      {searchResults.map(item => <p>{item.label}</p>)}
     </div> */}
    </>
   )
}