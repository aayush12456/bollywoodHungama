import React, { useState,useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetVerifyLoginOtpState, verifyLoginOtpAsync } from '../../Redux/Slice/verifyOtpSlice/verifyOtpSlice';
import swal from 'sweetalert';
import './loginOtpInput.css'
const LoginOtpInput=()=>{
const navigate=useNavigate()
const dispatch=useDispatch()
const phoneNumber = JSON.parse(sessionStorage.getItem('otpObject'));
const verifyOtpSelector=useSelector((state)=>state.verifyOtpData.verifyLoginOtpData.mssg)
const verifyOtpObj = JSON.parse(sessionStorage.getItem('verifyLoginOtpObject'));
const verifyLoginOtpObj=verifyOtpSelector||verifyOtpObj
// console.log('phone num',phoneNumber)
const [otp, setOtp] = useState('');
const [error, setError] = useState('');
const cancelClickHandler=()=>{
  sessionStorage.clear()
navigate('/login')
}
const verifyClickHandler=()=>{
  if (!otp) {
    setError('please enter OTP');
    return;
  }
  if (otp!==phoneNumber.otp) {
    setError('OTP does not match ');
    return;
  }
  const verifyOtpObj={
    otp:otp,
    phone:phoneNumber.phone
  }
  dispatch(verifyLoginOtpAsync(verifyOtpObj))
  swal({
    text: "Login Successfully",
    icon: "success",
    buttons: false,
    timer: 3000,
  });
  setError('');
}
useEffect(()=>{
  if(verifyLoginOtpObj){
    navigate('/')
    dispatch(resetVerifyLoginOtpState());
    
  }
   },[verifyLoginOtpObj])
return(
    <>
       <div className='backImage'  >
        <div style={{display:'flex',justifyContent:"center"}}>
          <div style={{marginTop:'8rem'}}>
 <h4 style={{textAlign:'center',color:'white'}}>Enter OTP</h4>
          <p style={{textAlign:'center',color:"white"}}>please enter the verification code sent to <span style={{color:"red"}}>{phoneNumber?.phone}</span> </p>
        <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={5}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
      inputStyle={{
        width: '50px',     // increase width here
        height: '50px',
        fontSize: '20px',
        borderRadius: '8px',
        border: '1px solid #ced4da',
        margin: '0 5px',
        textAlign: 'center',
      }}
    />
          </div>
       
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
          <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:12,marginLeft:-40}}>
        <button type="Submit" class="btn btn-secondary " id='cancelButton'  onClick={cancelClickHandler}>cancel </button>
   <button type="Submit" class="btn btn-primary " id='verifyButton'  onClick={verifyClickHandler}>verify </button>
   </div>
       </div>
    </>
)
}
export default LoginOtpInput