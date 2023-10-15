import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import rightArrow from '../assets/buttonicons/rightArrow.svg'
import leftArrow from '../assets/buttonicons/leftArrow.svg'
import { FilterSliceAcions } from "../Redux/Slice/FilterSlice/FilterSlice";
import { Title } from "../utils/constraints/title";
import { movieData } from "../utils/constraints/ShowMovie";
import AddMovieList from "../components/common/AddMovie/AddMovieList";
const Comedy=()=>{
    const [currentSlideComedy, setCurrentSlideComedy] = useState(0);
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
  const nextSlideComedy = () => {
    setCurrentSlideComedy(
      (prevSlide) =>
        (prevSlide + 1) %
       totalSlides
    );
  };

  const prevSlideComedy = () => {
    setCurrentSlideComedy(
      (prevSlide) =>
        (prevSlide - 1 +totalSlides) %
       totalSlides
    );
  };
return (
    <>
   <h4 style={{ color: "white" }} className="headingTitle2">
        Comedy Movie
      </h4>
      <div className="cardData">
        {filterData.comedy ? (
          filterData.comedy
            .slice(
              currentSlideComedy * itemsPerSlide,
              (currentSlideComedy + 1) * itemsPerSlide
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
        {Math.ceil((filterData.comedy?.length || 0) / itemsPerSlide) > 1 && (
          <div className="slider-controls">
            {currentSlideComedy > 0 && (
              <img
                src={leftArrow}
                className="leftArrow2"
                onClick={prevSlideComedy}
                alt="Previous"
              />
            )}
            {currentSlideComedy <
              Math.ceil((filterData.comedy?.length || 0) / itemsPerSlide) -
                1 && (
              <img
                src={rightArrow}
                alt="Next"
                className="rightArrow2"
                onClick={nextSlideComedy}
              />
              
            )}
          </div>
        )}
      </div>
    </>
)
}
export default Comedy