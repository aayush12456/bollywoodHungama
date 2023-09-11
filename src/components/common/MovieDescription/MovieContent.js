import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import './VideoPlayer.css'
import soundicon from '../../../assets/videoicons/soundicon.png'
import mutesoundicon from '../../../assets/videoicons/mutesoundicon.png'
import playButton from '../../../assets/videoicons/playButton.svg'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { PassMovieSliceAcions } from "../../../Redux/Slice/PassMovie/PassMovieSlice"
import { useSelector } from "react-redux"
const MovieContent = () => {
    let movieData = useLocation()
    const dispatch=useDispatch()
    const playVideos=useSelector(state=>state.passMovie.passMovie)
    const movieId=playVideos.MovieId
    const finalMovieData = movieData.state
    const videoUrl =finalMovieData.TrailerUrl
    
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
console.log(finalMovieData)
    const navigate=useNavigate()
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
    dispatch(PassMovieSliceAcions.passMovieData(finalMovieData))
  const playVideo=()=>{
 navigate(`/movie/video/${movieId}`);
  }

    return (
        <>
            <div className="video-container" >
                <div className={`fade-container ${showVideo ? "fade-out" : ""}`}>
               
                {!isPlaying && !isCompleted && !showVideo && (
       <div className="gradient-container">
       <img
           src={finalMovieData.TrailerImage}
           alt="Image before video starts"
           className="start-image1"
           loading="eager"
       />
       <div className="gradient-overlay"></div>
   </div>
    )}
                
                  
                   
                </div>
                <div className={`fade-container ${showVideo ? "fade-in" : "fade-out"}`}>
                    {!isCompleted && showVideo ? <video
                        controls
                        autoPlay
                        muted={isMuted}
                        id="player"
                        className={`videoPlayer video-player ${isPlaying ? "video-playing" : ""}`}
                        height="auto"
                        onPlay={handlePlay}
                        onEnded={handleVideoEnd}
                    >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video> :
                        <div className="gradient-container">
                        <img
                            src={finalMovieData.TrailerImage}
                            alt="Image before video starts"
                            className="start-image"
                            loading="eager"
                        />
                        <div className="gradient-overlay"></div>
                    </div>
                    }
                  
                    {/* {!isCompleted && showVideo && (
                        <div className="button">
                        <button className="videoBUtton "  id="button" onClick={handleToggleMute}>
                            {isMuted || !isPlaying ? (
                                <img className="imgButton" src={mutesoundicon}   alt="Muted" />
                            ) : (
                                <img className="imgButton" src={soundicon} alt="Unmuted" />
                            )}
                        </button>
                        </div>
                    )} */}
                </div>
             <div className="movieContent">
                <div className="movieDescription">
                {!isCompleted && showVideo && (
                        <div className="button">
                        <button className="videoBUtton "  id="button" onClick={handleToggleMute}>
                            {isMuted || !isPlaying ? (
                                <img className="imgButton" src={mutesoundicon}   alt="Muted" />
                            ) : (
                                <img className="imgButton" src={soundicon} alt="Unmuted" />
                            )}
                        </button>
                        </div>
                    )}
                <h1 className=" contenttitle"  >{finalMovieData.Title}</h1>
                <h5 className="contentDescription">{finalMovieData.Description }</h5>
                <div className="contentRating">
                <h5 className="contentRate">IMDb {finalMovieData.Rating }</h5>
                <h5 className="contentTime"> {finalMovieData.Time }</h5>
                <h5 className="contentDate"> {finalMovieData.Date }</h5>
                </div>
            <h5 className="Genres">{finalMovieData.Genres }</h5>
            <h5 className="premium">included with premium</h5>
            <div className="button">
            <img src={playButton} className="playButton"  onClick={playVideo}/>
            <h5 className="play" onClick={()=>playVideo(finalMovieData)}>Play</h5>
           
            </div>
                </div>
             </div>
               
            </div>

        </>
    )
}
export default MovieContent
{/* <ReactPlayer url='https://s3-bom-ww.cf.trailer.row.aiv-cdn.net/0b97/7de2/928d/46d7-89c7-b676d85014c7/9c5e0047-7a7d-4689-8819-7ec98094649e_video_900_audio_aaclc_128.mp4?Expires=1693415681&Signature=VcqWMBvJoSa3LDujweYIspKs8SybW2Um2kqH5T0jeYyW~NhzDhPb8ESge4u~2-s6Bto1e~l~eDNF9cyjXZixQYiC5JOtAWd2vRG7AgeECxb0SJ5hq7XXYbly0FPdS3HTWx5F-O6g~OJGVD~C79PA0Qdb8doFtEtT06KVs2MSr7pTLEjCISLJvHv2GeoWvoMiwPAjuwNN~i2B0CwoxtEdlV6lo6SRLVS8m7PVeIIMk1Y5Ibp2G7hIHWLzDwj9NnmMn9Yl2SbThSLeeeyhTRz1PZyZvN0RPhNf3rjdIfXTBFQfMXeY5Cbs91WaVbDy5fspSEMZfsTIl5xhadThrM2HEQ__&Key-Pair-Id=APKAJIYEUF5P2E3CCYTA' style={{marginLeft:'20rem'}}/> */ }
{/* <ReactPlayer url={videoUrl} controls={true} style={{marginLeft:'20rem'}} /> */ }

{/* <video controls autoPlay muted={isMuted} id="player" className="videoPlayer video-player" height='auto'>
        <source src={videoUrl} type="video/mp4"  />
        Your browser does not support the video tag.
        <img src='https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/0e3da645e07ccd1028d50d9a7ce5ef3189ba8aa7b3838b154be35b50542de7b6._RI_TTW_SX1920_FMwebp_.jpg'/>
      </video> */}

      //https://www.koimoi.com/wp-content/new-galleries/2022/05/ajay-devgns-drishyam-at-china-box-office-001.jpg
      //G2fTVc-1geU
      //https://i.ytimg.com/vi/nGNmyt9Ywqc/maxresdefault.jpg
      
    //   {!isPlaying && !isCompleted && !showVideo && (
    //     <img
    //         src={finalMovieData.TrailerImage}
    //         alt="Image before video starts"
    //         className="start-image"                       
    //         loading="eager"
             
    //     />
    // )}