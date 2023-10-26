import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import rightArrow from '../assets/buttonicons/rightArrow.svg'
import leftArrow from '../assets/buttonicons/leftArrow.svg'
import { FilterSliceAcions } from "../Redux/Slice/FilterSlice/FilterSlice";
import { Title } from "../utils/constraints/title";
import { movieData } from "../utils/constraints/ShowMovie";
import AddMovieList from "../components/common/AddMovie/AddMovieList";

const FeelGood = () => {
  const [currentSlideFeelGood, setCurrentSlideFeelGood] = useState(0);
  const [filterData, setFilterData] = useState({});

  const movieArray = Object.values(movieData);
  const dispatch = useDispatch()

  useEffect(() => {
    const newFilterData = {};
    Title.forEach((title) => {
      const genreMovies = movieArray.filter((movie) => movie.Heading === title);
      newFilterData[title] = genreMovies;
    });
    setFilterData(newFilterData);
  }, []);
  // console.log(filterData)
  dispatch(FilterSliceAcions.FilterSliceData(filterData))
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil((filterData.recommend?.length || 0) / itemsPerSlide);
  const nextSlideFeelGood = () => {
    setCurrentSlideFeelGood(
      (prevSlide) =>
        (prevSlide + 1) %
        totalSlides
    );
  };

  const prevSlideFeelGood = () => {
    setCurrentSlideFeelGood(
      (prevSlide) =>
        (prevSlide - 1 + totalSlides) %
        totalSlides
    );
  };

  return (
    <>
      <h4 style={{ color: "white" }} className="headingTitle1">
        FeelGood Movie
      </h4>
      <div className="cardData">
        {filterData.feelgood ? (
          filterData.feelgood
            .slice(
              currentSlideFeelGood * itemsPerSlide,
              (currentSlideFeelGood + 1) * itemsPerSlide
            )
            .map((movie) => {

              return (
                <div key={movie.id}>
                  <AddMovieList movies={movie} />
                </div>
              );
            })
        ) : (
          <p>No feelgood movies found.</p>
        )}
        {Math.ceil((filterData.feelgood?.length || 0) / itemsPerSlide) > 1 && (
          <div className="slider-controls">
            {currentSlideFeelGood > 0 && (
              <img
                src={leftArrow}
                className="leftArrow1"
                onClick={prevSlideFeelGood}
                alt="Previous"
              />
            )}
            {currentSlideFeelGood <
              Math.ceil((filterData.feelgood?.length || 0) / itemsPerSlide) -
              1 && (
                <img
                  src={rightArrow}
                  alt="Next"
                  className="rightArrow1"
                  onClick={nextSlideFeelGood}
                />
              )}
          </div>
        )}
      </div>
    </>
  )
}
export default FeelGood