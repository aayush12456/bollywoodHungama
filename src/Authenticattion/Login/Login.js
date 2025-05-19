import { useState } from 'react';
import './login.css';
import {useDispatch} from 'react-redux'
import { resetLoginOtpState, userLoginOtpAsync } from '../../Redux/Slice/loginOtpSlice/loginOtpSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const loginOtpSelector=useSelector((state)=>state?.loginOtpData?.loginOtpData?.mssg)
  const phoneNumberObj = JSON.parse(sessionStorage.getItem('otpObject'));
  const loginOtpObj=loginOtpSelector || phoneNumberObj
  // console.log('login otp is',loginOtpSelector)
  const [phoneNumber,setPhoneNumber]=useState('')
  const [error, setError] = useState('');
  const phoneChangeHandler=(event)=>{
  setPhoneNumber(event.target.value)
  setError('');
  }
  const phoneSubmitHandler = (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      setError('please enter phone number');
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('please enter  10 digit number');
      return;
    }

    const phoneObj = {
      phone: phoneNumber
    };
    // console.log('phone num is', phoneObj);
   dispatch(userLoginOtpAsync(phoneObj))
    setPhoneNumber('');
    setError('');
  };
 useEffect(()=>{
if(loginOtpObj){
  navigate('/verifyOtp')
  dispatch(resetLoginOtpState());
}
 },[loginOtpObj])
  return (
    <>
      <div className='backImage'  >
     <form onSubmit={phoneSubmitHandler}>
   <div style={{display:'flex',justifyContent:'center'}}>
   <div class="mb-3" >
    <input type="text" class="form-control1"  onChange={phoneChangeHandler}
      value={phoneNumber}   aria-describedby="emailHelp"  placeholder='Enter your phone number' />
      {error && (
                <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {error}
                </div>
              )}
  </div>
   </div>
   <div style={{display:'flex',justifyContent:'center'}}>
   <button type="Submit" class="btn btn-primary loginOtpButton" >Send OTP</button>
   </div>
     </form>

      </div>
    </>
  );
};

export default Login;
