import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import rightArrow from '../assets/buttonicons/rightArrow.svg'
import leftArrow from '../assets/buttonicons/leftArrow.svg'
import { FilterSliceAcions } from "../Redux/Slice/FilterSlice/FilterSlice";
import { Title } from "../utils/constraints/title";
import { movieData } from "../utils/constraints/ShowMovie";
import AddMovieList from "../components/common/AddMovie/AddMovieList";
const Romance=()=>{
    const [currentSlideRomance, setCurrentSlideRomance] = useState(0);
    const [filterData, setFilterData] = useState({});
    const movieArray = Object.values(movieData);
    const dispatch=useDispatch()
    useEffect(() => {
        const newFilterData = {};
    
        Title.forEach((title) => {
          const genreMovies = movieArray.filter((movie) => movie.Heading === title);
          newFilterData[title] = genreMovies;
        });
    
        setFilterData(newFilterData);
      }, []);
      console.log(filterData)
      dispatch(FilterSliceAcions.FilterSliceData(filterData))
      const itemsPerSlide = 4;
      const totalSlides = Math.ceil((filterData.recommend?.length || 0) / itemsPerSlide);
      const nextSlideRomance = () => {
        setCurrentSlideRomance(
          (prevSlide) =>
            (prevSlide + 1) %
           totalSlides
        );
      };
    
      const prevSlideRomance = () => {
        setCurrentSlideRomance(
          (prevSlide) =>
            (prevSlide - 1 +totalSlides) %
           totalSlides
        );
      };
return (
    <>
  <h4 style={{ color: "white" }} className="headingTitle3">
        Romantic Movie
      </h4>
      <div className="cardData">
        {filterData.romance ? (
          filterData.romance
            .slice(
              currentSlideRomance * itemsPerSlide,
              (currentSlideRomance + 1) * itemsPerSlide
            )
            .map((movie) => {
           
              return (
                <div key={movie.id}>
                  <AddMovieList movies={movie} />
                </div>
              );
            })
        ) : (
          <p>No Comdey movies found.</p>
        )}
        {Math.ceil((filterData.romance?.length || 0) / itemsPerSlide) > 1 && (
          <div className="slider-controls">
            {currentSlideRomance > 0 && (
              <img
                src={leftArrow}
                className="leftArrow3"
                onClick={prevSlideRomance}
                alt="Previous"
              />
            )}
            {currentSlideRomance <
              Math.ceil((filterData.romance?.length || 0) / itemsPerSlide) -
                1 && (
              <img
                src={rightArrow}
                alt="Next"
                className="rightArrow3"
                onClick={nextSlideRomance}
              />
              
            )}
          </div>
        )}
      </div>
    </>
)
}
export default Romance