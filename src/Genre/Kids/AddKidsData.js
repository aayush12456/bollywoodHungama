import { useSelector } from "react-redux"
import AddMovieList from '../../components/common/AddMovie/AddMovieList'
import '../Comedy/AddComedyData.css'
const AddKidsData=()=>{
    const filterSliceData=useSelector(state=>state.filterSlice.FilterSliceData)
return (
    <>
     <h4 className='text-white headingTitle'>Kids</h4>
 <div className='cardDatas'>
 {
filterSliceData.kids.map(movie=>{
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
export default AddKidsData