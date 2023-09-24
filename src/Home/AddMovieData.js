import { movieData } from "../utils/constraints/ShowMovie";
import { useState, useEffect } from "react";
import AddMovieList from "../components/common/AddMovie/AddMovieList";
import { Title } from "../utils/constraints/title";
import rightArrow from '../assets/buttonicons/rightArrow.svg'
import leftArrow from '../assets/buttonicons/leftArrow.svg'
import { useDispatch } from "react-redux";
import "./AddMovieData.css";
import { FilterSliceAcions } from "../Redux/Slice/FilterSlice/FilterSlice";

const AddMovieData = () => {
  const movieArray = Object.values(movieData);
const dispatch=useDispatch()
  const [filterData, setFilterData] = useState({});
  const [currentSlideRecommend, setCurrentSlideRecommend] = useState(0);
  const [currentSlideFeelGood, setCurrentSlideFeelGood] = useState(0);
  const [currentSlideComedy, setCurrentSlideComedy] = useState(0);
  const [currentSlideRomance, setCurrentSlideRomance] = useState(0);
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
        (prevSlide - 1 +totalSlides) %
       totalSlides
    );
  };

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
  );
};

export default AddMovieData;
