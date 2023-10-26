import AddMovieList from '../../components/common/AddMovie/AddMovieList'
import '../Comedy/AddComedyData.css'
import { useState,useEffect } from "react"
import { Title } from "../../utils/constraints/title"
import { movieData } from "../../utils/constraints/ShowMovie"
const AddKidsData=()=>{
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
     <h4 className='text-white headingTitle'>Kids</h4>
 <div className='cardDatas'>
 {
filterData.kids ? (
    filterData.kids
     
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
export default AddKidsData