import { deleteUserAsync } from '../../Redux/Slice/deleteProfileUser/deleteProfileUser'
import './accountAndSetting.css'
import {useDispatch} from 'react-redux'
import {useNavigate}from 'react-router-dom'
import Swal from 'sweetalert2'
const AccountAndSetting=()=>{
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const phoneObj=JSON.parse(sessionStorage.getItem('verifyLoginOtpObject'))
  const deleteProfileUser = async () => {
    const phoneNumberObj = {
      phone: phoneObj.phone,
    };
  
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
        preConfirm: () => {
          sessionStorage.clear();
          dispatch(deleteUserAsync(phoneNumberObj));
          navigate('/');
  
          // Show custom message with no OK button and custom font size
          Swal.fire({
            html: `<p style="font-size: 20px;">You have successfully deleted your account.</p>`,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000 // optional: auto-close after 3 seconds
          });
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  
    return (
        <>
          <h4 style={{ color: "white" }} class="accountsTitle">
          Account & Settings
        </h4>

        <div class="card settingCard" >
  <div class="card-body">
    <h5 class="card-title deleteTitle" style={{fontWeight:"bold"}}>Delete Account</h5>
    <div class="accountCard" >
    <p class="card-text settingText" >We’ll miss you! Deleting your account will remove your profile and favorites forever.</p>
    <button type="btn"  class="btn btn-primary deleteAccount"  onClick={deleteProfileUser} >
                  Delete Account
                  </button>
    </div>

  </div>
</div>
        </>
    )
    }
    export default AccountAndSetting