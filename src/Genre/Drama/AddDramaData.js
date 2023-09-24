import AddMovieList from "../../components/common/AddMovie/AddMovieList"
import '../Comedy/AddComedyData.css'
import { useSelector } from "react-redux"
const AddDramaData=()=>{
    const filterSliceData=useSelector(state=>state.filterSlice.FilterSliceData)
return (
    <>
     <h4 className='text-white headingTitle'>Drama</h4>
 <div className='cardData'>
 {
filterSliceData.drama?.map(movie=>{
    return (
        <>
        <AddMovieList movies={movie}/>
        </>
    )
})
 }
 </div>
    </>
)
}
export default AddDramaData