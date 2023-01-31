import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export const UpdateCat = () => {

    const {catId} = useParams()
    const [cat, updateCat] = useState({
        isOut: false,
        outReason: "",
        notes: ""
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/cats/${catId}`)
            .then(res => res.json())
            .then((data) => {
                updateCat(data)
            })
        },
        [catId]
    )

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/cats/${cat.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cat)
        })
        .then (res => res.json())
        .then(() => {
            window.alert("Updates successfully saved")
        })
    }

    return (
        <>
        <form className="catProfileForm">
            <fieldset>
                <div className="form-group">
                <label htmlFor="notes">Notes:</label>
                    <input
                    required autoFocus
                    type="textarea"
                    className="form-notes"
                    placeholder="Notes about this cat"
                    defaultValue={cat.notes}
                    onChange={
                        (evt) => {
                            const copy = {...cat}
                            copy.notes = evt.target.value
                            updateCat(copy)
                        }
                    } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="out">Is Out:</label>
                    <input type="checkbox" 
                        checked={cat.isOut}
                        onChange={
                            (evt) => {
                                const copy = {...cat}
                                copy.isOut = evt.target.checked
                                updateCat(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="outReason">Reason Out:</label>
                    <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Reason Cat Is Out"
                    defaultValue={cat.outReason}
                    onChange={
                        (evt) => {
                            const copy = {...cat}
                            copy.outReason = evt.target.value
                            updateCat(copy)
                        }
                    } />
                </div>
            </fieldset>
            <button 
            onClick = {(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="interiorBtn">
                Save Updates
            </button>
        </form>
        </>
    )

}