import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import rightArrow from '../assets/buttonicons/rightArrow.svg'
import leftArrow from '../assets/buttonicons/leftArrow.svg'
import { FilterSliceAcions } from "../Redux/Slice/FilterSlice/FilterSlice";
import { Title } from "../utils/constraints/title";
import { movieData } from "../utils/constraints/ShowMovie";
import AddMovieList from "../components/common/AddMovie/AddMovieList";
import axios from "axios";
import io from "socket.io-client";
// const socket = io.connect("http://localhost:4000");
const BASE_URL = "https://bollywoodprojectbackend.onrender.com/user";
const socket = io.connect("https://bollywoodprojectbackend.onrender.com");
const Comedy = () => {
  const [currentSlideComedy, setCurrentSlideComedy] = useState(0);
  const [filterData, setFilterData] = useState({});
  const [getWatchListArray,setGetWatchListArray]=useState([])
  const movieArray = Object.values(movieData);
  const dispatch = useDispatch()
  const idObj=JSON.parse(sessionStorage.getItem('verifyLoginOtpObject'))
  const id=idObj?.loginUserObj?._id
  useEffect(() => {
    const getWatchList = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${BASE_URL}/getPlaylist/${id}?phone=${idObj?.loginUserObj?.phone}`
          );
        //   console.log('get watch list is',response?.data)
          setGetWatchListArray(response?.data?.playListArray);
        }
      } catch (error) {
        // console.error("Error fetching matches:", error);
      }
    };
  
    getWatchList();
  
    socket.on("getPlaylist", (newUser) => {
  
        setGetWatchListArray(newUser)
    });
  
    return () => {
      socket.off("getWatchlist");
    };
  }, [id,idObj?.loginUserObj?.phone]);
  // console.log('get watch list array recommend',getWatchListArray)
  const finalMovieArray = getWatchListArray
  ? movieArray.filter(
      (item) =>
        !getWatchListArray.some(
          (watchItem) => watchItem.title === item.Title // or use `.toLowerCase()` if needed
        )
    )
  : movieArray;

// console.log('final movie array', finalMovieArray);
  useEffect(() => {
    const newFilterData = {};
    Title.forEach((title) => {
      const genreMovies = finalMovieArray.filter((movie) => movie.Heading === title);
      newFilterData[title] = genreMovies;
    });
    setFilterData(newFilterData);
  }, [finalMovieArray]);
  // console.log(filterData)
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
        (prevSlide - 1 + totalSlides) %
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