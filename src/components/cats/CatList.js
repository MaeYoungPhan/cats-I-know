import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Cats.css"

export const CatList = ( {searchTermState} ) => {
    const [cats, setCats] = useState([])
    const [filteredCats, setFiltered] = useState([])
    const [searchedOnly, setSearched] = useState(false)
    const navigate = useNavigate()

    const localKittyUser = localStorage.getItem("kitty_user")
    const kittyUserObject = JSON.parse(localKittyUser)

    useEffect(
        () => {
            const searchedCats = cats.filter(cat => {
                return cat.userId === kittyUserObject.id && cat.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedCats)
        },
        [searchTermState]
    )

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

    return <>

    <button onClick={ () => navigate("/cat/add")}>Add a Cat</button>

    <h2 className="catHeader">My Cats</h2>

    <article className="cats">
        {
            filteredCats.map(
                (cat) => {
                return <div className="catDiv" key={cat.id}>
                    <img className="catImg" src={cat.image} />
                    <p className="catLink--P"><Link className="catLink" to={`/cat/${cat.id}`}>{cat.name}</Link></p>
                    <footer className="catDate">Found: {cat.foundDate}</footer>
                </div>}
            )
        }
    </article>
    </>

}