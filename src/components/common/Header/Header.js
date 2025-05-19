import './Header.css'
import search from '../../../assets/headericons/search.png'
import bollywood from '../../../assets/headericons/bollywood.png'
import hamburger from '../../../assets/headericons/hamburger.png'
import { useDispatch, useSelector } from 'react-redux'
import { hamburgerActions } from '../../../Redux/Slice/authSlice/hamburgerSlice'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { movieData } from '../../../utils/constraints/ShowMovie'
import profiles from '../../../assets/profileicons/profile.png'
import { profileData } from '../../../utils/constraints/ShowProfile'
import Swal from 'sweetalert2'
import swal from 'sweetalert'
import { PassMovieSliceAcions } from '../../../Redux/Slice/PassMovie/PassMovieSlice'
import { PassSliceDataActions } from '../../../Redux/Slice/passSlice/passSliceData'
import { profilesActions } from '../../../Redux/Slice/profilesSlice/profilesSlice'
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profileOpenSelector=useSelector((state)=>state.profiles.profilesToggle)
  // console.log('profiles open',profileOpenSelector)
  // let mobile = useLocation()
  const movieArray = Object.values(movieData);
  // console.log(mobile)
  const verifyOtpObj = JSON.parse(sessionStorage.getItem('verifyLoginOtpObject'));
  // console.log('verify otp in header',verifyOtpObj)
  const [mobileItem, setMobile] = useState(false)
  const [mobileData, setMobileData] = useState(" ")
  const [loginData, setLogin] = useState(true)
  const [user, setUser] = useState(false);
  const [arr, setArr] = useState([])
  const [profile, setProfile] = useState(true)
  const [selectedProfile, setSelectedProfile] = useState("");
  const [searchItem, setSearch] = useState(true)
  const [recommendations, setRecommendations] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  // useEffect(() => {
  //   const mobileData = mobile.state
  //   setMobileData(mobileData)
  // }, [])
  useEffect(() => {
    // This code will run only once when the component mounts
    const profileArray = Object.values(profileData);
    setArr(profileArray);
  }, []);
  // console.log(arr)
  useEffect(() => {
    window.addEventListener('keydown', handleBackspace);
    return () => {
      window.removeEventListener('keydown', handleBackspace);
    };
  }, []);

  const hamburgerHandler = () => {
    dispatch(hamburgerActions.handleToggle())
  }

  const addMovie = () => {
    navigate('/AddMovie/:admin')
  }
  dispatch(PassSliceDataActions.profileNameData(mobileData))
  const updateRecommendations = (inputText) => {
    const lowerCaseInput = inputText.toLowerCase();
    const filteredMovies = movieArray.filter(
      (item) => item.Title.toLowerCase().includes(lowerCaseInput)
    );
    if (filteredMovies.length === 0) {
      setSearchResult([{ id: 'not-available', Title: 'Not Available' }]);
    } else {
      setSearchResult([]);
    }
    setRecommendations(
      inputText === '' ? [] : filteredMovies // Clear recommendations if inputText is empty
    );
  };
  ;

  const handleBackspace = (e) => {
    if (e.keyCode === 8) {
      setSearch('');
      setRecommendations([]);
    }
  };

  const searchTitleData = (recommendation) => {
    navigate('/search', { state: recommendation })
    setRecommendations([])
  }

  const login = () => {
    navigate('/login')
    setLogin(false)
  }

  const mobiles = (mobileData) => {
    setMobile(true)
    setUser(!user)
    setProfile(true)
    setMobileData(mobileData)
  }

 

  const handlelogout = () => {
    sessionStorage.clear()
    dispatch(profilesActions.handleProfileToggle())
    navigate('/');
    swal({
      text: "You have successfully logged out.",
      icon: "success",
      buttons: false,
      timer: 3000,
    });
  };
  // console.log(searchResult)
  // const manageProfile = () => {
  //   navigate('/profiles', { state: mobileData })
  // }

  // const addNew = () => {
  //   navigate('/newProfile')
  // }

  // const nameData = (profileName) => {
  //   setSelectedProfile(profileName)
  //   setProfile(false)
  //   swal({
  //     text: "Switch to profile Successfully!",
  //     icon: "success",
  //     buttons: false,
  //     timer: 3000,
  //   });
  //   navigate('/')
  //   // console.log('hello world')
  //   dispatch(PassMovieSliceAcions.passMovieData(mobileData))
  // }
const createAccount=()=>{
  navigate('/signup')
}
const profileClickHandler=()=>{
  dispatch(profilesActions.handleProfileToggle())
}
const watchListHandler=()=>{
  navigate('/watchlist')
  dispatch(profilesActions.handleProfileToggle())
}
const accountAndSettingHandler=()=>{
  navigate('/accountAndSetting')
  dispatch(profilesActions.handleProfileToggle())
}
  return (
    <>
      <div class="card headerCard">
        <div class="card-body  ">
          <div class="header-body">
          <div class="form-group">
            <img src={hamburger} className='hamburger' alt='hamburger' onClick={hamburgerHandler} />
          </div>
          <div class="form-group bolly-header" style={{display:'flex',justifyContent:'start'}}>
            <img src={bollywood} className=' img-bolly' alt='bollywood' />
          </div>

          <div class="form-group searchMovies">
            <form>
              <input type="text" class="form-control searchbar" onChange={(e) => {
                updateRecommendations(e.target.value);
              }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Movies" autoComplete='off' />
            </form>
            <img src={search} className='img-search' alt="search" />
          </div>
          <div class="profileData">
          {verifyOtpObj?<div >
            <img src={profiles} class='profileImg' alt='profile'/>
          </div>:null}
          <p class="headerProfile" style={{color:'white',textAlign:'center',cursor:'pointer'}} onClick={profileClickHandler}>{verifyOtpObj?.loginUserObj?.firstName}</p>
          </div>
          {verifyOtpObj?null: <div class="form-group signout" style={{marginRight:'1rem'}}>
            <button type="btn" onClick={createAccount} class="btn btn-primary" style={{width:'100%'}} >
                  Join
                  </button>
            </div>}
            {verifyOtpObj?null:
            <div class="form-group signout">
              <button type="btn" onClick={login} class="btn btn-secondary" style={{width:'100%'}} >
                  Login
                  </button>
            </div>
}
{verifyOtpObj?.loginUserObj?.firstName === "Admin" ? (
            <div className="form-group ">
               <button type="btn" onClick={addMovie} class="btn btn-secondary addMovieForm"  >
            Add Movie
            </button>
            </div>
          ) : null}
          </div>
         {profileOpenSelector===false || verifyOtpObj?.loginUserObj?.firstName==='Admin'?null: <div class="card cardLogin" >
                <div class='cardProfile'>
                  <div>
                    <h4 class='profileAccount'>My Stuff</h4>
                    <p class='text-white watchList' onClick={watchListHandler}>WatchList</p>
                  </div>
                  <div style={{marginRight:'1rem'}} >
                    <h4 class='profileAccounts'>Your Account</h4>
                    <p class='text-white watchList' onClick={accountAndSettingHandler}>Account & Settings</p>
                    <h5 class="card-title text-white logout" onClick={handlelogout} style={{ cursor: 'pointer' }} >Logout</h5>
                  </div>
                  </div>
                  </div>}
                  {profileOpenSelector===true && verifyOtpObj?.loginUserObj?.firstName==='Admin'?
                    <div  class="card cardLogins">
                      <div>
                      <h4 class='profileAccount' onClick={handlelogout} style={{ cursor: 'pointer' }}>Logout</h4>
                        </div>
                      </div>:null
                  }
                  {recommendations.length > 0 && (
          <div className="recommendations">
            <ul style={{ display: "grid", gridTemplateColumns: '1fr', gap: '1.4rem' }}>
              {recommendations.map((recommendation) => (
                <li key={recommendation.id} style={{ listStyleType: 'none', cursor: 'pointer' }} onClick={() => searchTitleData(recommendation)}>{recommendation.Title}</li>
              ))}
            </ul>
          </div>
        )}

{searchResult.length > 0 && (
          <div className="recommendations">
            <ul style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.4rem" }}>
              {searchResult.map((result) => (

                <li
                  key={result.id}
                  style={{ listStyleType: "none" }}
                  onClick={() => searchTitleData(result)}
                >
                  {result.Title}
                </li>
              ))}
            </ul>
          </div>
        )}
                    
        </div>
       
        
      </div>
    </>
  )
}
export default Header