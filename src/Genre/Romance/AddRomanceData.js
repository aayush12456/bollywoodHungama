import { useSelector } from "react-redux"
import AddMovieList from "../../components/common/AddMovie/AddMovieList"
import '../Comedy/AddComedyData.css'
const AddRomanceData=()=>{   
    const filterSliceData=useSelector(state=>state.filterSlice.FilterSliceData) 
return (
    <>
    <h4 className='text-white headingTitle'>Romance</h4>
 <div className='cardDatas'>
 {
filterSliceData.romance.map(movie=>{
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
export default AddRomanceData