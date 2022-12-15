import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import "./Map.css"
import blueCat from "./images/blueCat.png"
import catShadow from "./images/catShadow.png"


export const Map = () => {

  const [cats, setCats] = useState([])
  const [filteredCats, setFiltered] = useState([])

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
        setFiltered(myCats.sort(function(a,b){ return new Date(a.foundDate) - new Date(b.foundDate)}))
    },
    [cats]
)
  
  var catIcon = L.icon({
    iconUrl: blueCat,
    shadowUrl: catShadow,

    iconSize:     [25, 25], // size of the icon
    shadowSize:   [27, 27], // size of the shadow
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
    shadowAnchor: [13, 13],  // the same for the shadow
    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
});

   return (
   <MapContainer center={[36.1627, -86.7816]} zoom={10} scrollWheelZoom={false}>
   <TileLayer
     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />
   {/* {filteredCats.map(
    (cat) => {
   return <Marker key= {cat.id} position={[cat.lat, cat.long]} icon={catIcon}>
     <Popup>
     <Link className="catLink" to={`/cat/${cat.id}`}>{cat.name}</Link>
     <div><img className="catImg" src={cat.image} /></div>
     </Popup>
   </Marker>})} */}
 </MapContainer> )
}