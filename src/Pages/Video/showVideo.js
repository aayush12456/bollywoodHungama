import PlayVideo from "../../components/common/video/playVideo"
import { useLocation } from "react-router-dom"
const ShowVideo=()=>{
const videoDataObj=useLocation()
// console.log('video data obj',videoDataObj)
return (
    <>
    <PlayVideo movieDetail={videoDataObj?.state}/>
    </>
)
}
export default ShowVideo