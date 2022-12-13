export const CatSearch = ({setterFunction}) => {
    return (
        <input className="catSearch"
        onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
        type="text" placeholder="Search Cats" />
    )
}