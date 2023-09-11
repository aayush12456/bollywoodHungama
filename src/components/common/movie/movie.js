import { Outlet } from "react-router-dom"
import MovieContent from "../MovieDescription/MovieContent"

const Movie=()=>{
return (
    <>
    <MovieContent/>
    <Outlet/>
    </>
)
}
export default Movie