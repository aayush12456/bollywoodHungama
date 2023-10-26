import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import './VideoPlayer.css';
import soundicon from '../../../assets/videoicons/soundicon.png';
import mutesoundicon from '../../../assets/videoicons/mutesoundicon.png';
import playButton from '../../../assets/videoicons/playButton.svg';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PassMovieSliceAcions } from "../../../Redux/Slice/PassMovie/PassMovieSlice";
import { useSelector } from "react-redux";

const MovieContent = () => {
    let movieData = useLocation();
    const dispatch = useDispatch();
    const playVideos = useSelector(state => state.passMovie.passMovie);
    const movieId = playVideos.MovieId;
    const finalMovieData = movieData.state;
    const videoUrl = finalMovieData.TrailerUrl;

    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [videoNotAvailable, setVideoNotAvailable] = useState(false);

    // console.log(finalMovieData);

    const navigate = useNavigate();

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
        navigate(`/movie/video/${movieId}`);
    };

    return (
        <>
            <div className="video-container" >
                <div className={`fade-container ${showVideo ? "fade-out" : ""}`}>
                    {!isPlaying && !isCompleted && !showVideo && !videoNotAvailable && (
                        <div className="gradient-container">
                            <img
                                src={finalMovieData.TrailerImage}
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
                                src={finalMovieData.TrailerImage}
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
                        <h1 className="contenttitle">{finalMovieData.Title}</h1>
                        <h5 className="contentDescription">{finalMovieData.Description}</h5>
                        <div className="contentRating">
                            <h5 className="contentRate">IMDb {finalMovieData.Rating}</h5>
                            <h5 className="contentTime">{finalMovieData.Time}</h5>
                            <h5 className="contentDate">{finalMovieData.Date}</h5>
                        </div>
                        <h5 className="Genres">{finalMovieData.Genres}</h5>
                        <h5 className="premium">included with premium</h5>
                        <div className="button">
                            <img src={playButton} className="playButton" onClick={playVideo} />
                            <h5 className="play" onClick={() => playVideo(finalMovieData)}>Play</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieContent;
