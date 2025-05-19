import { SidebarData } from "../../../utils/constraints/SideBarData"
import SideBarMenu from "./SideBarMenu"
import './SideBar.css'
import users from '../../../assets/sidebaricons/users.png'
import profile from '../../../assets/profileicons/profile.png'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { hamburgerActions } from "../../../Redux/Slice/authSlice/hamburgerSlice"
const Sidebar=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const verifyLoginOtpObject=JSON.parse(sessionStorage.getItem('verifyLoginOtpObject'))
    // console.log('otp obj',verifyLoginOtpObject)
    const allUserHandler=()=>{
    navigate('/allUser')
    }
    const createAccount=()=>{
        navigate('/signup')
      }
      const login = () => {
        navigate('/login')
      }
      const sideBarLogout=()=>{
        sessionStorage.clear()
        navigate('/')
        dispatch(hamburgerActions.handleToggle())
      }
      const profileClickHandler=()=>{
        navigate('/profile')
        dispatch(hamburgerActions.handleToggle())
      }
      const sidebarTitleClickHandler=()=>{
        dispatch(hamburgerActions.handleToggle())
      }
    return (
        <>
        <div class="card sidebarCard" style={{backgroundColor:'#060d17'}}>
  <div class="card-body1">
    {verifyLoginOtpObject?<div style={{display:'flex',gap:35,marginLeft:30}}>
      <img src={profile}  class="profileSidebar" alt="profile"/>
      <p class="profileSidebarName" onClick={profileClickHandler} >{verifyLoginOtpObject?.loginUserObj?.firstName}</p>
    </div>:null}
    {
 SidebarData?.map((item,index)=>{
    return(
        <>
        {
       item.link? <Link key={index} to={item.link} style={{textDecoration:'none',color:'black'}} onClick={sidebarTitleClickHandler}><SideBarMenu data={item} /></Link>:  
       <div style={{cursor:"pointer"}}>
           <SideBarMenu data={item} />
       </div>
        }
        </>
    )
})
    }
  </div>
  {verifyLoginOtpObject?.loginUserObj?.firstName==='Admin'?<div style={{display:"flex",marginTop:28,gap:12,cursor:'pointer'}}> 
        <img src={users} className="icon-img mx-4 icon " onClick={allUserHandler} alt="users" />
        <h5 class="card-title title text-white " onClick={allUserHandler}>All User</h5>
        </div>:null}
       {verifyLoginOtpObject?null:<div>
        <button type="btn" onClick={createAccount} class="btn btn-primary sidebarJoin"  >
                  Join
                  </button>
                  <button type="btn" onClick={login} class="btn btn-secondary sidebarLogin"  >
                  Login
                  </button>
        </div>}
          {verifyLoginOtpObject?<p class="sidebarLogout" onClick={sideBarLogout}>Logout</p>:null } 
</div>
        </>
    )
    }
    export default Sidebar