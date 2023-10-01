import AddMovieList from "../components/common/AddMovie/AddMovieList"
import './searchData.css'
const SearchData=({searchDataContent})=>{
    let movies=searchDataContent
return (
    <>
    <div className="searchData">
    <AddMovieList movies={movies}/>
    </div>
 
    </>
)
}
export default SearchData