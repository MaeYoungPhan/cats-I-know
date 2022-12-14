import { useState } from "react"

export const UpdateCat = ( {catObject} ) => {

    const [cat, updateCat] = useState({
        isOut: catObject.isOut,
        outReason: catObject.outReason,
        notes: catObject.notes,
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/cats/${catObject.id}`, {
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
                    type="text"
                    className="form-notes"
                    placeholder="Notes about this cat"
                    defaultValue={catObject.notes}
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
                        value={catObject.isOut} defaultChecked={catObject.isOut}
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
                    defaultValue={catObject.outReason}
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