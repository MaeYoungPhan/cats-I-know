export const CatSearch = ({setterFunction}) => {
    return (
        <input
        onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
        type="text" placeholder="Search Cats" />
    )
}