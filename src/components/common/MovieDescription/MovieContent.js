import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import './VideoPlayer.css';
import soundicon from '../../../assets/videoicons/soundicon.png';
import mutesoundicon from '../../../assets/videoicons/mutesoundicon.png';
import playButton from '../../../assets/videoicons/playButton.svg';
import watchListButton from '../../../assets/videoicons/circle.svg';
import rightCircleButton from '../../../assets/videoicons/rightCircle.png';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PassMovieSliceAcions } from "../../../Redux/Slice/PassMovie/PassMovieSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import {Helmet} from 'react-helmet'
// const socket = io.connect("http://localhost:4000");
// const BASE_URL = "http://localhost:4000/user";
const socket = io.connect("https://bollywoodprojectbackend.onrender.com");
const BASE_URL = "https://bollywoodprojectbackend.onrender.com/user";
const MovieContent = () => {
    let movieData = useLocation();
    const dispatch = useDispatch();
    const playVideos = useSelector(state => state.passMovie.passMovie);
    const verifyLoginOtpObject=JSON.parse(sessionStorage.getItem('verifyLoginOtpObject'))
    // console.log('verify obj',verifyLoginOtpObject)
    const movieId = playVideos.MovieId;
    const finalMovieData = movieData.state;
    // console.log('final movie',finalMovieData)
    const videoUrl = finalMovieData.TrailerUrl || finalMovieData.trailerUrl;
    const id=verifyLoginOtpObject?.loginUserObj?._id
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [videoNotAvailable, setVideoNotAvailable] = useState(false);
    const [condtion,setCondition]=useState(false)
    const [getWatchListArray,setGetWatchListArray]=useState([])
    // console.log(finalMovieData);

    const navigate = useNavigate();
    const title=finalMovieData?.Title
    useEffect(() => {
        const delay = setTimeout(() => {
            setShowVideo(true);
        }, 2000);
        return () => clearTimeout(delay);
    }, []);

    const handleToggleMute = () => {
        setIsMuted(prevMuted => !prevMuted);
    };

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handleVideoEnd = () => {
        setIsCompleted(true);
        setIsPlaying(false);
    };

    const handleVideoError = () => {
        setVideoNotAvailable(true);
    };

    dispatch(PassMovieSliceAcions.passMovieData(finalMovieData));

    const playVideo = () => {
        navigate(`/movie/video/${movieId}`,{state:finalMovieData});
    };
   const watchListVideo=async(finalMovieData)=>{
    const addPlayListObj={
    phone:verifyLoginOtpObject.loginUserObj.phone,
    ...finalMovieData
    }
    // console.log('add play list',addPlayListObj)
    try {
        const response = await axios.post(`${BASE_URL}/addPlaylist`, addPlayListObj);
        // console.log('response in add watchlist data',response?.data?.playListArray)
        socket.emit('addWatchlist', response?.data?.playListArray)
    } catch (error) {
        console.error('Error sending message:', error);
    }
   }
   useEffect(() => {
    const getWatchList = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${BASE_URL}/getPlaylist/${id}?phone=${verifyLoginOtpObject?.loginUserObj?.phone}`
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
  }, [id,verifyLoginOtpObject?.loginUserObj?.phone]);
//   console.log('get watch list array',getWatchListArray)
  useEffect(() => {
    if (id && finalMovieData?.title) {
      const data = getWatchListArray.some(
        (item) =>
          item?.title?.toLowerCase().trim() === finalMovieData?.title?.toLowerCase().trim()
      );
      setCondition(data);
    }
  }, [id, getWatchListArray, finalMovieData]);
  
//    console.log('conditon is',condtion)

   const removeWatchListVideo=async(finalMovieData)=>{
    const removePlayListObj={
    phone:verifyLoginOtpObject.loginUserObj.phone,
    ...finalMovieData
    }
    // console.log('remove play list',removePlayListObj)
    try {
        const response = await axios.post(`${BASE_URL}/deletePlaylist/${id}`, removePlayListObj);
        // console.log('response in delete watchlist data',response?.data?.playListArray)
        socket.emit('deleteWatchlist', response?.data?.playListArray)
    } catch (error) {
        console.error('Error sending message:', error);
    }
   }
    return (
        <>
          <Helmet>
            <title>BollyWood Hungama : {`${title}`}</title>
        </Helmet>
            <div className="video-container" >
                <div className={`fade-container ${showVideo ? "fade-out" : ""}`}>
                    {!isPlaying && !isCompleted && !showVideo && !videoNotAvailable && (
                        <div className="gradient-container">
                            <img
                                src={finalMovieData.TrailerImage || finalMovieData.trailerImage}
                                alt="Image before video starts"
                                className="start-image1"
                                loading="eager"
                            />
                            <div className="gradient-overlay"></div>
                            {/* <div className="play-button-container">
                                <img
                                    src={playButton}
                                    alt="Play Button"
                                    className="play-button"
                                    onClick={playVideo}
                                />
                                <img
                                    src={soundicon}
                                    alt="Sound Icon"
                                    className={`sound-icon ${isMuted ? 'muted' : ''}`}
                                    onClick={handleToggleMute}
                                />
                            </div> */}
                        </div>
                    )}

                    {videoNotAvailable && (
                        <div className="gradient-container">
                            <img
                                src={finalMovieData.TrailerImage || finalMovieData.trailerImage}
                                alt="Image before video starts"
                                className="start-image1"
                                loading="eager"
                            />
                            <div className="gradient-overlay"></div>
                        </div>
                    )}
                </div>
                <div className={`fade-container ${showVideo ? "fade-in" : "fade-out"}`}>
                    {!isCompleted && showVideo && !videoNotAvailable ?
                        <video
                            controls
                            autoPlay
                            muted={isMuted}
                            id="player"
                            className={`videoPlayer video-player ${isPlaying ? "video-playing" : ""}`}
                            height="auto"
                            onPlay={handlePlay}
                            onEnded={handleVideoEnd}
                            onError={handleVideoError}
                        >
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video> :
                        <div className="gradient-container">
                            <img
                                src={finalMovieData.TrailerImage || finalMovieData.trailerImage}
                                alt="Image before video starts"
                                className="start-image"
                                loading="eager"
                            />
                            <div className="gradient-overlay"></div>
                        </div>
                    }
                </div>
                <div className="movieContent">
                    <div className="movieDescription">
                        {!isCompleted && showVideo && !videoNotAvailable && (
                            <div className="button">
                                <button className="videoBUtton " id="button" onClick={handleToggleMute}>
                                    {isMuted || !isPlaying ? (
                                        <img className="imgButton" src={mutesoundicon} alt="Muted" />
                                    ) : (
                                        <img className="imgButton" src={soundicon} alt="Unmuted" />
                                    )}
                                </button>
                            </div>
                        )}
                        <h1 className="contenttitle">{finalMovieData.Title || finalMovieData.title}</h1>
                        <h5 className="contentDescription">{finalMovieData.Description || finalMovieData.description}</h5>
                        <div className="contentRating">
                            <h5 className="contentRate">IMDb {finalMovieData.Rating || finalMovieData.rating}</h5>
                            <h5 className="contentTime">{finalMovieData.Time || finalMovieData.Time}</h5>
                            <h5 className="contentDate">{finalMovieData.Date || finalMovieData.date}</h5>
                        </div>
                        <h5 className="Genres">{finalMovieData.Genres || finalMovieData.genres}</h5>
                        <h5 className="premium">included with premium</h5>
                        <div style={{display:'flex'}}>
                        <div className="button">
                            <img src={playButton} className="playButton" onClick={playVideo} alt="playVideo" />
                            <h5 className="play" onClick={() => playVideo(finalMovieData)}>Play</h5>
                        </div>
                
                        {condtion===true?null:<div style={{display:'flex',gap:12,marginLeft:'-20%'}}>
                            <img src={watchListButton} class="watchButton" alt="watchButton" onClick={()=>watchListVideo(finalMovieData)} />
                            <h5 style={{paddingTop:50,color:'white'}} class="watchTitle" onClick={() => watchListVideo(finalMovieData)}>Watchlist</h5>
                        </div>}
                        {condtion===true?<div style={{display:'flex',gap:12,marginLeft:'-20%'}}>
                            <img src={rightCircleButton} className="watchButton" alt="rightCircle" onClick={()=>removeWatchListVideo(finalMovieData)} />
                        </div>:null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieContent;
