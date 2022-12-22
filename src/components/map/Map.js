import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import "./Map.css"
import { MapSearch } from './MapSearch';
import blueCat from "./images/blueCat.png"
import greenCat from "./images/greenCat.png"
import catShadow from "./images/catShadow.png"


export const Map = () => {

  const [cats, setCats] = useState([])
  const [filteredCats, setFiltered] = useState([])
  const [colonies, setColonies] = useState([])
    const [filteredColonies, setFilteredColonies] = useState([])

  const localKittyUser = localStorage.getItem("kitty_user")
    const kittyUserObject = JSON.parse(localKittyUser)

  const getAllCats = () => {
    fetch(`http://localhost:8088/cats`)
        .then(res => res.json())
        .then((catArray) => {
            setCats(catArray)
        })
}

useEffect(
    () => {
        getAllCats()
    },
    []
)

useEffect(
    () => {
        const myCats = cats.filter(cat => cat.userId === kittyUserObject.id)
        setFiltered(myCats)
    },
    [cats]
)

const getAllColonies = () => {
  fetch(`http://localhost:8088/colonies`)
      .then(res => res.json())
      .then((coloniesArray) => {
          setColonies(coloniesArray)
      })
}

useEffect(
  () => {
      getAllColonies()
  },
  []
)

useEffect(
  () => {
      const myColonies = colonies.filter(colony => colony.userId === kittyUserObject.id)
      setFilteredColonies(myColonies)
  },
  [colonies]
)
  
  var catIcon = L.icon({
    iconUrl: blueCat,
    shadowUrl: catShadow,

    iconSize:     [20, 20], // size of the icon
    shadowSize:   [22, 22], // size of the shadow
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
    shadowAnchor: [11, 11],  // the same for the shadow
    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
});

var colonyIcon = L.icon({
  iconUrl: greenCat,
  shadowUrl: catShadow,

  iconSize:     [20, 20], // size of the icon
  shadowSize:   [22, 22], // size of the shadow
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
  shadowAnchor: [11, 11],  // the same for the shadow
  popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
});

   return (
    <>
    <div>
    <MapSearch />
    </div>
   <MapContainer center={[36.1627, -86.7816]} zoom={12} scrollWheelZoom={false}>
   <TileLayer
     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />
   {filteredCats.map(
    (cat) => {
   return <Marker key= {cat.id} position={[cat.lat, cat.long]} icon={catIcon}>
     <Popup>
     <Link className="catLink" to={`/cat/${cat.id}`}>{cat.name}</Link>
     <div><img className="catImg" src={cat.image} /></div>
     </Popup>
   </Marker>})}
   {filteredColonies.map(
    (colony) => {
   return <Marker key= {colony.id} position={[colony.lat, colony.long]} icon={colonyIcon}>
     <Popup>
     <Link className="colonyLink" to={`/colony/${colony.id}`}>{colony.nickname}</Link>
     <div><img className="colonyImg" src={colony.image} /></div>
     </Popup>
   </Marker>})}
 </MapContainer></>)
}