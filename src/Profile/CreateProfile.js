import './CreateProfile.css'
import profile1 from '../assets/profileicons/profile1.png'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AddProfileData } from '../Redux/Slice/profileSlice/profileSlice'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
const CreateProfile=()=>{
    const [input,setInput]=useState(' ')
    const [inputObj,setInputObj]=useState({})
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const profileInput=(event)=>{
setInput(event.target.value)
    }
    const formSubmit=(e)=>{
    e.preventDefault()
    const obj={
        name:input
    }
    setInput(' ')
    setInputObj(obj)
    swal({
        text: "Data added Successfully!",
        icon: "success",
        buttons: false,
        timer: 3000,
    });
    dispatch(AddProfileData(obj))
    }
    console.log(inputObj)
    const cancel=()=>{
        navigate('/newProfile')
    }
   
return (
    <>
    <p className='text-white text-center createProfile'>New Profile</p>
    <img src={profile1} className='profile1'/>
    <div>
        <form onSubmit={formSubmit}>
        <div class="form-group">
    <input type="text"  onChange={profileInput} class="profileField mt-4"  autoComplete='off'  placeholder="Enter Name" value={input}/>
  </div>
  <div className='createButtons '>
    <button type="button" class="btn btn-secondary" onClick={cancel}>Cancel</button>
    <button type="submit" class="btn btn-primary" >Save Changes</button>
    </div>
        </form>
    </div>
   
    </>
)
}
export default CreateProfile