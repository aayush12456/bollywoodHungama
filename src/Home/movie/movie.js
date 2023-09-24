import { Outlet } from "react-router-dom"
import MovieContent from "../../components/common/MovieDescription/MovieContent"

const Movie=()=>{
return (
    <>
    <MovieContent/>
    <Outlet/>
    </>
)
}
export default Movie