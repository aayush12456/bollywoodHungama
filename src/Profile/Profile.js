import { useLocation } from 'react-router-dom'
import profile from '../assets/headericons/profile.png'
import './profile.css'
import { useNavigate } from 'react-router-dom'
import { profileData } from '../utils/constraints/ShowProfile'
import { useEffect,useState } from 'react'
import profile1 from '../assets/profileicons/profile1.png'
const Profile=()=>{
    const mobile=useLocation()
    const mobileData=mobile.state
    const [arr,setArr]=useState([])
    const navigate=useNavigate()
    const newProfile=()=>{
    navigate('/newProfile')
    }
    useEffect(() => {
        // This code will run only once when the component mounts
        const profileArray = Object.values(profileData);
        setArr(profileArray);
      }, []); 
      console.log(arr)
      const myProfileImg=()=>{
        navigate('/')
      }
return (
    <>
    <p className="text-white text-center  watch " >Who's watching?</p>
    <div className='profileData1'>
        <div>
        <img src={profile} className='myProfileImg' onClick={myProfileImg}/>
<p className='text-white text-center pt-2'>{mobileData}</p>
        </div>
        <div  className='extraProfile'>
          
        {
    arr.map(data=>{
  
      return (
        <>
        <div>
        {/* <img src={profile1} className='secondUser'/> */}
        <img src={profile1} className='myProfileImg1'/>
        <p className='text-white pt-2 profileData2'>{data.name}</p>
        </div>
        </>
      )
    })
   }
        </div>  
<div >
<img src="https://www.svgrepo.com/show/73554/add-round-button.svg" onClick={newProfile} className='addnewImg'/>
<p className='text-white pt-2 text-center cursor-pointer' onClick={newProfile} style={{cursor:'pointer'}}> Add New</p>
</div>

    </div>
    </>
)
}
export default Profile