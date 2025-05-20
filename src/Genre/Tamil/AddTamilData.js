import AddMovieList from '../../components/common/AddMovie/AddMovieList'
import '../Comedy/AddComedyData.css'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import axios from "axios";
import io from "socket.io-client";
const BASE_URL = "https://bollywoodprojectbackend.onrender.com/user";
const socket = io.connect("https://bollywoodprojectbackend.onrender.com");
const AddTamilData=()=>{
    const filterSliceData=useSelector(state=>state.filterSlice.FilterSliceData)
    const [getWatchListArray,setGetWatchListArray]=useState([])
    const [finalTamilMovieArray, setFinalTamilMovieArray] = useState([]);
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

      useEffect(() => {
        if (filterSliceData?.tamil) {
          const filtered = filterSliceData.tamil.filter(
            (item) =>
              !getWatchListArray.some(
                (watchItem) => watchItem.title === item.Title
              )
          );
          setFinalTamilMovieArray(filtered);
        }
      }, [filterSliceData?.tamil, getWatchListArray]);
return (
    <>
     <h4 className='text-white headingTitle'>Tamil</h4>
 <div className='cardDatas'>
 {
finalTamilMovieArray?.map(movie=>{
    return (
        <>
        <AddMovieList movies={movie}/>
        </>
    )
})
 }
 </div>
    </>
)
}
export default AddTamilData