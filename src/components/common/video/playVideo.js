import { useLocation } from "react-router-dom"
import YouTube from 'react-youtube';
import './playVideo.css'
import crossIcon from '../../../assets/modalicons/crossicon.svg'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const PlayVideo = ({movieDetail}) => {
  const videoPlayData = useSelector(state => state.passMovie.passMovie)
  // console.log(videoPlayData)
  // const videoPlayData = videoData.state
  const navigate = useNavigate()
  const videoId = videoPlayData.MovieId || videoPlayData.movieId
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const opts = {
    height: '440',
    width: '800',
    playerVars: {
      autoplay: 1,
    },
  };

  const crossIcons = () => {
    navigate('/movie',{state:movieDetail})
  }
  // console.log(videoUrl)
  return (
    <>
      <div className="container" onClick={crossIcons}>
        <div className="video-container">
          <div class="cards cardVideo"  >
            <img src={crossIcon} className="crossIcon" onClick={crossIcons} alt="crossIcon" />
            <YouTube videoId={videoId} className="video" opts={opts} />
          </div>
        </div>
      </div>
    </>
  )
}
export default PlayVideo