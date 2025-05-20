import { useState } from "react";
import { useEffect } from "react";
import rightArrow from '../assets/buttonicons/rightArrow.svg'
import leftArrow from '../assets/buttonicons/leftArrow.svg'
import { useDispatch } from "react-redux";
import { FilterSliceAcions } from "../Redux/Slice/FilterSlice/FilterSlice";
import AddMovieList from "../components/common/AddMovie/AddMovieList";
import { Title } from "../utils/constraints/title";
import { movieData } from "../utils/constraints/ShowMovie";
import './Recommend.css'
import axios from "axios";
import io from "socket.io-client";
// const socket = io.connect("http://localhost:4000");
const BASE_URL = "https://bollywoodprojectbackend.onrender.com/user";
const socket = io.connect("https://bollywoodprojectbackend.onrender.com");
const Recommended = () => {
  const [filterData, setFilterData] = useState({});
  const [currentSlideRecommend, setCurrentSlideRecommend] = useState(0);
  const [getWatchListArray,setGetWatchListArray]=useState([])

  const movieArray = Object.values(movieData);// object hatake data array me dala
  // const profileData = useSelector(state => state)
  // console.log(profileData)
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
        console.error("Error fetching matches:", error);
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
    // console.log(filterData) heading ke basis pe array sort hua 
  dispatch(FilterSliceAcions.FilterSliceData(filterData))
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil((filterData.recommend?.length || 0) / itemsPerSlide); // ceil function roundup data
  const nextSlideRecommend = () => {
    setCurrentSlideRecommend(
      (prevSlide) =>  // means agar prevslide 3 hai to ye 1 sebadkar 4 hoga to divide hoga totalSlides se
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
                  style={{ zIndex:1}}
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