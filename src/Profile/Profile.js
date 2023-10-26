import { useLocation } from 'react-router-dom'
import profile from '../assets/headericons/profile.png'
import './profile.css'
import { useNavigate } from 'react-router-dom'
import { profileData } from '../utils/constraints/ShowProfile'
import { useEffect, useState } from 'react'
import profile1 from '../assets/profileicons/profile1.png'
import { useDispatch } from 'react-redux'
import { deleteProfileData } from '../Redux/Slice/profileSlice/deleteProfileSlice'
import deleteImg from "../assets/profileicons/delete.png"
import Swal from 'sweetalert2'
import swal from 'sweetalert'

const Profile = () => {
  const mobile = useLocation()
  const mobileData = mobile.state
  const [arr, setArr] = useState([])
  const [updatedProfileData, SetUpdatedProfileData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const newProfile = () => {
    navigate('/newProfile')
  }
  // console.log(profileData)

  useEffect(() => {
    let currentData = [...updatedProfileData]
    Object.keys(profileData).map((key, i) => {

      let obj = { id: profileData[key].id, name: profileData[key].name, keys: key }
      currentData.push(obj)
    })
    SetUpdatedProfileData(currentData)
    // This code will run only once when the component mounts
    // const profileArray = Object.values(profileData)
    // setArr(profileArray);
  }, []);

  // console.log(arr)
  const myProfileImg = () => {
    navigate('/')
  }

  const handleDeleteProfile = (profileId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // User clicked "Yes" in the dialog, proceed with profile deletion.
          dispatch(deleteProfileData(profileId))
            .then((result) => {
              if (deleteProfileData.fulfilled.match(result)) {
                console.log(`Profile with ID ${result.payload} deleted successfully.`);
                SetUpdatedProfileData(updatedProfileData.filter(data => data.keys !== profileId));
                swal({
                  text: "Profile Deleted Successfully!",
                  icon: "success",
                  buttons: false,
                  timer: 3000,
                });
              } else {
                console.error(result.payload);
              }
            });
        }
      });
  };


  return (
    <>
      <p className="text-white text-center  watch " >Who's watching?</p>
      <div className='profileData1'>
        <div>
          <img src={profile} className='myProfileImg' onClick={myProfileImg} />
          <p className='text-white text-center pt-2 phoneContent'>{mobileData}</p>
        </div>
        <div className='extraProfile'>

          {
            updatedProfileData.map(data => {

              return (
                <>
                  <div>
                    {/* <img src={profile1} className='secondUser'/> */}
                    <img src={profile1} className='myProfileImg1' />
                    <img src={deleteImg} className='deleteImg' onClick={() => handleDeleteProfile(data.keys)} />
                    <p className='text-white pt-2 profileData2'>{data.name}</p>
                  </div>
                </>
              )
            })
          }
        </div>
        <div >
          <img src="https://www.svgrepo.com/show/73554/add-round-button.svg" onClick={newProfile} className='addnewImg' />
          <p className='text-white pt-2 text-center cursor-pointer AddNew' onClick={newProfile} style={{ cursor: 'pointer' }}> Add New</p>
        </div>

      </div>
    </>
  )
}
export default Profile