import AddMovieList from '../../components/common/AddMovie/AddMovieList'
import '../Comedy/AddComedyData.css'
import { useSelector } from 'react-redux'
const AddTamilData=()=>{
    const filterSliceData=useSelector(state=>state.filterSlice.FilterSliceData)
return (
    <>
     <h4 className='text-white headingTitle'>Tamil</h4>
 <div className='cardDatas'>
 {
filterSliceData.tamil.map(movie=>{
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
export default AddTamilData