import { useEffect,useState } from "react"
import axios from "axios";
import io from "socket.io-client";
import AddMovieList from "../common/AddMovie/AddMovieList";
import './watchlist.css'
// const socket = io.connect("http://localhost:4000");
const socket = io.connect("https://bollywoodprojectbackend.onrender.com");
// const BASE_URL = "http://localhost:4000/user";
const BASE_URL = "https://bollywoodprojectbackend.onrender.com/user";
const WatchList=()=>{
    const idObj=JSON.parse(sessionStorage.getItem('verifyLoginOtpObject'))
    // console.log('id obj in watch',idObj)
    const id=idObj?.loginUserObj?._id
    const [getWatchListArray,setGetWatchListArray]=useState([])
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
      
        socket.on("getWatchlist", (newUser) => {
      
            setGetWatchListArray(newUser)
        });
      
        return () => {
          socket.off("getWatchlist");
        };
      }, [id,idObj?.loginUserObj?.phone]);
      // console.log('get watch list array',getWatchListArray)
return (
    <>
     <h4 style={{ color: "white" }} className="watchlistTitle">
         Watchlist
        </h4>
    <div class="watchlist">
    {
        getWatchListArray.map((watch)=>{
            // console.log('get watch map',watch)
            return (
                <>
                 <div key={watch.id} style={{marginTop:'1rem'}}>
               {/* <AddWatchList watch={watch}/> */}
               <AddMovieList movies={watch}/>
                </div>
                </>
            )
        })
    }
    </div>
    </>
)
}
export default WatchList