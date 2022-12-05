// import { useParams, useNavigate } from "react-router-dom"
// import { useEffect, useState } from "react"

// export const Cat = ( {catObject} ) => {

//     const profileUpdate = (e) => {
//     // const {catId} = useParams()
//     const [cat, updateCat] = useState({
//         isOut: false,
//         outReason: "not out",
//         notes: ""
//     })

//     const navigate = useNavigate()

//     const handleSaveButtonClick = (e) => {
//         e.preventDefault()

//         return fetch(`http://localhost:8088/cats?id=${catObjectId}`, {
//             method: "PUT", //explore PATCH
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(cat)
//         })
//         .then (res => res.json())
//         .then(() => {
//             navigate("/cat/${cat.id}")
//         })
//     }

//     return (
//         <form className="catProfileForm">
//             <fieldset>
//                 <div className="form-group">
//                     <input
//                     required autoFocus
//                     type="text"
//                     className="form-control"
//                     placeholder={cat.notes}
//                     value={cat.notes}
//                     onChange={
//                         (evt) => {
//                             const copy = {...cat}
//                             copy.notes = evt.target.value
//                             updateCat(copy)
//                         }
//                     } />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="out">Is Out:</label>
//                     <input type="checkbox"
//                         value={cat.isOut}
//                         onChange={
//                             (evt) => {
//                                 const copy = {...cat}
//                                 copy.isOut = evt.target.checked
//                                 updateCat(copy)
//                             }
//                         } />
//                 </div>
//             </fieldset>
//             <button 
//             onClick = {(clickEvent) => handleSaveButtonClick(clickEvent)}
//             className="btn btn-primary">
//                 Submit Edits
//             </button>
//         </form>
//     )

// }}