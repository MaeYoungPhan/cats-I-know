export const DailyLogSearch = ({setterFunction}) => {
    return (
        <input
        className="logSearch"
        onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
        type="text" placeholder="Enter Colony Name" />
    )
}