import { Outlet, Route, Routes } from "react-router-dom"
import { CatForm } from "../cats/CatForm"
import { CatContainer } from "../cats/CatContainer"
import { CatDetails } from "../cats/CatDetails"
import { CatEdit } from "../cats/CatEdit"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
				<h1>Cats I Know</h1>
				<div>A Cat Tracker App</div>

				<Outlet />
				</>
			}>

			<Route path="cats" element={ <CatContainer /> } />
			<Route path="cat/add" element={ <CatForm /> } />
			<Route path="cat/:catId" element={ <CatDetails /> } />
			<Route path="cat/:catId/edit" element={ <CatEdit /> } />

			</Route>
		</Routes>)
}

