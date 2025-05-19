
import './profile.css'
import { useNavigate } from 'react-router-dom'



const Profile = () => {
  const navigate=useNavigate()
  const watchlistClickHandler=()=>{
  navigate('/watchlist')
  }
  const accountHandler=()=>{
    navigate('/accountAndSetting')
  }
  
  return (
    <>
        <h4 style={{ color: "white" }} class="headingTitles">
         Profile
        </h4>
  <div class="card profileCard">
  <div class="card-body4">
   <p style={{cursor:'pointer',paddingLeft:'2rem',paddingTop:'1em'}} class="watchlistSidebar" onClick={watchlistClickHandler} >Watchlist</p>
   <p style={{cursor:'pointer',paddingLeft:'2rem'}} onClick={accountHandler} class="accountSidebar">Account & Settings</p>
  </div>
</div>
    </>
  )
}
export default Profile