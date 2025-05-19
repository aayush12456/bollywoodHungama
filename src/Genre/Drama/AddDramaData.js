import AddMovieList from "../../components/common/AddMovie/AddMovieList"
import '../Comedy/AddComedyData.css'
import { useSelector } from "react-redux"
import { useState,useEffect } from "react"
import { Title } from "../../utils/constraints/title"
import { movieData } from "../../utils/constraints/ShowMovie"
import {Helmet} from 'react-helmet'
const AddDramaData=()=>{
    const filterSliceData=useSelector(state=>state.filterSlice.FilterSliceData)
    const movieArray = Object.values(movieData);
    const [filterData, setFilterData] = useState({});
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
            <title>BollyWood Hungama | Watch Drama Movies</title>
        </Helmet>
     <h4 className='text-white headingTitle'>Drama</h4>
 <div className='cardDatas'>
 {
filterData.drama ? (
    filterData.drama
     
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
export default AddDramaData