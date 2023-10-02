import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { auth } from '../../firebase/firebase.js';
import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [user, setUser] = useState(false);
  const [mobile, setMobile] = useState('');
  const [flag, setFlag] = useState(false);
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  function setUpRecaptcha(mobile) {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, mobile, recaptchaVerifier);
  }

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(mobile)
    setError('');

    if (mobile === '' || mobile === undefined) {
      return setError('Please enter a valid phone number!');
    }

    try {
      const response = await setUpRecaptcha(mobile);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (otp === '' || otp === null) return;

    try {
      await result.confirm(otp);
      navigate('/',{state:mobile}); // Navigate to your desired route ("/" in this case)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
        {!flag && (
          <form onSubmit={getOtp}>
            <div className='mobileInput'>
            <div className="phone">
              <PhoneInput
                placeholder="Enter phone number"
                value={mobile}
                onChange={setMobile}
                className="number"
              />
              
            <div id="recaptcha-container"></div>
            </div>
            <div id="button">
              <button type="submit" className="btn btn-primary">
                Send OTP
              </button>
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </div>
            </div>
          </form>
        )}

        <form onSubmit={verifyOtp} style={{ display: flag ? 'block' : 'none' }}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control1"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="button-right">
            {/* Implement navigation logic after OTP verification */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/login')}
            >
              Cancel
            </button>
            &nbsp;
            <button type="submit" className="btn btn-primary">
              Verify
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
