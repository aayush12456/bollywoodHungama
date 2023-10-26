import { useState } from "react";
import { useEffect } from "react";
import rightArrow from '../assets/buttonicons/rightArrow.svg'
import leftArrow from '../assets/buttonicons/leftArrow.svg'
import { useDispatch } from "react-redux";
import { FilterSliceAcions } from "../Redux/Slice/FilterSlice/FilterSlice";
import AddMovieList from "../components/common/AddMovie/AddMovieList";
import { Title } from "../utils/constraints/title";
import { movieData } from "../utils/constraints/ShowMovie";
import { useSelector } from "react-redux";
import './Recommend.css'

const Recommended = () => {
  const [filterData, setFilterData] = useState({});
  const [currentSlideRecommend, setCurrentSlideRecommend] = useState(0);

  const movieArray = Object.values(movieData);
  const profileData = useSelector(state => state)
  // console.log(profileData)
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
  const nextSlideRecommend = () => {
    setCurrentSlideRecommend(
      (prevSlide) =>
        (prevSlide + 1) %
        totalSlides
    );
  };

  const prevSlideRecommend = () => {
    setCurrentSlideRecommend(
      (prevSlide) =>
        (prevSlide - 1 + totalSlides) %
        totalSlides
    );
  };

  return (
    <>
      <div>
        <h4 style={{ color: "white" }} className="headingTitle">
          Recommended Movie
        </h4>
      </div>
      <div className="cardData">
        {filterData.recommend ? (
          filterData.recommend
            .slice(
              currentSlideRecommend * itemsPerSlide,
              (currentSlideRecommend + 1) * itemsPerSlide
            )
            ?.map((movie) => {
              return (
                <div key={movie.id}>
                  <AddMovieList movies={movie} />
                </div>
              );
            })
        ) : (
          <p>No recommend movies found.</p>
        )}
        {Math.ceil((filterData.recommend?.length || 0) / itemsPerSlide) > 1 && (
          <div className="slider-controls">
            {currentSlideRecommend > 0 && (
              <img
                src={leftArrow}
                className="leftArrow"
                onClick={prevSlideRecommend}
                alt="Previous"
              />
            )}
            {currentSlideRecommend <
              Math.ceil((filterData.recommend?.length || 0) / itemsPerSlide) -
              1 && (
                <img
                  src={rightArrow}
                  alt="Next"
                  className="rightArrow"
                  onClick={nextSlideRecommend}
                />
              )}
          </div>
        )}
      </div>
    </>
  )
}
export default Recommended