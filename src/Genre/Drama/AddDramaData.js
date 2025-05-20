import AddMovieList from "../../components/common/AddMovie/AddMovieList"
import '../Comedy/AddComedyData.css'
// import { useSelector } from "react-redux"
import { useState,useEffect } from "react"
import { Title } from "../../utils/constraints/title"
import { movieData } from "../../utils/constraints/ShowMovie"
import {Helmet} from 'react-helmet'
import axios from "axios";
import io from "socket.io-client";
const BASE_URL = "https://bollywoodprojectbackend.onrender.com/user";
const socket = io.connect("https://bollywoodprojectbackend.onrender.com");
const AddDramaData=()=>{
    // const filterSliceData=useSelector(state=>state.filterSlice.FilterSliceData)
    const movieArray = Object.values(movieData);
    const [filterData, setFilterData] = useState({});
    const [getWatchListArray,setGetWatchListArray]=useState([])
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

    const finalDramaMovieArray = getWatchListArray
    ? movieArray.filter(
        (item) =>
          !getWatchListArray.some(
            (watchItem) => watchItem.title === item.Title // or use `.toLowerCase()` if needed
          )
      )
    : movieArray;
    useEffect(() => {
        const newFilterData = {};
        Title.forEach((title) => {
          const genreMovies = finalDramaMovieArray.filter((movie) => movie.Heading === title);
          newFilterData[title] = genreMovies;
        });
    
        setFilterData(newFilterData);
      }, [finalDramaMovieArray]);
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