export const DailyLogSearch = ({setterFunction}) => {
    return (
        <input
        onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
        type="text" placeholder="Enter Colony Name" />
    )
}