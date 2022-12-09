import { Outlet, Route, Routes } from "react-router-dom"
import { CatForm } from "../cats/CatForm"
import { CatContainer } from "../cats/CatContainer"
import { CatDetails } from "../cats/CatDetails"
import { CatEdit } from "../cats/CatEdit"
import { ColonyList } from "../colonies/ColonyList"
import { ColonyForm } from "../colonies/ColonyForm"
import { ColonyDetails } from "../colonies/ColonyDetails"
import { DailyLogContainer } from "../dailylog/DailyLogContainer"
import { Dashboard } from "../dashboard/dashboard"

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
			
			<Route path="dashboard" element={ <Dashboard /> } />
			<Route path="cats" element={ <CatContainer /> } />
			<Route path="cat/add" element={ <CatForm /> } />
			<Route path="cat/:catId" element={ <CatDetails /> } />
			<Route path="cat/:catId/edit" element={ <CatEdit /> } />
			<Route path="colonies" element={ <ColonyList /> } />
			<Route path="colony/add" element={ <ColonyForm /> } />
			<Route path="colony/:colonyId" element={ <ColonyDetails /> } />
			<Route path="dailylog" element={ <DailyLogContainer /> } />

			</Route>
		</Routes>)
}

