import AddMovieList from '../../components/common/AddMovie/AddMovieList'
import './AddComedyData.css'
import { useSelector } from 'react-redux'
import { useState,useEffect } from "react"
import { Title } from "../../utils/constraints/title"
import { movieData } from "../../utils/constraints/ShowMovie"
import {Helmet} from 'react-helmet'
const AddComedyData=()=>{
    const filterSliceData=useSelector(state=>state.filterSlice.FilterSliceData)
    // console.log(filterSliceData.comedy)
    const [filterData, setFilterData] = useState({});
    const movieArray = Object.values(movieData);
    useEffect(() => {
        const newFilterData = {};
    
        Title.forEach((title) => {
          const genreMovies = movieArray.filter((movie) => movie.Heading === title);
          newFilterData[title] = genreMovies;
        });
    
        setFilterData(newFilterData);
      }, []);
return (
    <>
     <Helmet>
            <title>BollyWood Hungama | Watch Comedy Movies</title>
        </Helmet>
 <h4 className='text-white headingTitle'>Comedy</h4>
 <div className='cardDatas'>
 {
filterData.comedy ? (
    filterData.comedy
     
     .map((movie,index) => {
        return (
          <div key={index}>
            <AddMovieList movies={movie} />
          </div>
        );
      })
  ) : (
    <p>No kids movies found.</p>
  )}
 </div>

    </>
)
}
export default AddComedyData