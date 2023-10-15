import './NewProfile.css'
import { useNavigate } from 'react-router-dom'
import { profileData } from '../utils/constraints/ShowProfile'
import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PassMovieSliceAcions } from '../Redux/Slice/PassMovie/PassMovieSlice'
import './NewProfile.css'
import { ProfileNameSliceActions, profileNameSlice } from '../Redux/Slice/profileName/profileNameSlice'
const NewProfile=()=>{
    const navigate=useNavigate()
    const [arr,setArr]=useState([])
    const dispatch=useDispatch()
    const createProfile=()=>{
      navigate('/createProfile')
    }
    useEffect(() => {
      // This code will run only once when the component mounts
      const profileArray = Object.values(profileData);
      setArr(profileArray);
    }, []); 
    const cancelData=()=>{
      navigate('/profiles')
    }
    dispatch(ProfileNameSliceActions.profileNameData(arr));
return (
    <>
    <p className="text-white text-center  newProfiles ">New profile</p>
    <p className="text-white text-center bolly-Text" >Create an BollywoodHungama profile for Prime Video or add an existing one below.</p>
    <p className='learnProfile text-center polly-Text'>Learn more about Profiles</p>
    <button type="button" class="btn btn-secondary profileButton" onClick={createProfile}>Create profile</button>
   {
    arr.map(data=>{
      return (
        <>
        {/* <img src={profile1} className='secondUser'/> */}
        <p key={data.name} className='text-white secondUser pt-4'>{data.name}</p>
        <p className='secondUser'>__________________________________________________________________</p>
        </>
      )
    })
   }
    <button type="button" class="btn btn-secondary cancelButton" onClick={cancelData}>Cancel</button>
    </>
)
}
export default NewProfile