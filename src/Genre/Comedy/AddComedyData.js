import AddMovieList from '../../components/common/AddMovie/AddMovieList'
import './AddComedyData.css'
import { useSelector } from 'react-redux'
const AddComedyData=()=>{
    const filterSliceData=useSelector(state=>state.filterSlice.FilterSliceData)
    // console.log(filterSliceData.comedy)
return (
    <>
 <h4 className='text-white headingTitle'>Comedy</h4>
 <div className='cardDatas'>
 {
filterSliceData.comedy.map(movie=>{
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
export default AddComedyData