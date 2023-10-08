import './Header.css'
import search from '../../../assets/headericons/search.png'
import bollywood from '../../../assets/headericons/bollywood.png'
import hamburger from '../../../assets/headericons/hamburger.png'
import { useDispatch } from 'react-redux'
import { hamburgerActions } from '../../../Redux/Slice/authSlice/hamburgerSlice'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { movieData } from '../../../utils/constraints/ShowMovie'
import { useLocation } from 'react-router-dom'
import { auth } from '../../../firebase/firebase'
import { signOut } from 'firebase/auth'
import profile from '../../../assets/headericons/profile.png'
import { profileData } from '../../../utils/constraints/ShowProfile'
import Swal from 'sweetalert2'
import swal from 'sweetalert'
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let mobile = useLocation()
  console.log(mobile)
  const [searchItem, setSearch] = useState(true)
  const [recommendations, setRecommendations] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const movieArray = Object.values(movieData);
  const [mobileItem, setMobile] = useState(false)
  const [mobileData, setMobileData] = useState(" ")
  const [loginData, setLogin] = useState(true)
  const [user, setUser] = useState(false);
  const [arr,setArr]=useState([])
  const [selectedProfile, setSelectedProfile] = useState("");
  useEffect(() => {

    const mobileData = mobile.state
    setMobileData(mobileData)
  }, [])
  useEffect(() => {
    // This code will run only once when the component mounts
    const profileArray = Object.values(profileData);
    setArr(profileArray);
  }, []); 
  console.log(arr)
  const hamburgerHandler = () => {
    dispatch(hamburgerActions.handleToggle())
  }
  const addMovie = () => {
    navigate('/AddMovie')
  }
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

  useEffect(() => {
    window.addEventListener('keydown', handleBackspace);
    return () => {
      window.removeEventListener('keydown', handleBackspace);
    };
  }, []);
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
 setMobileData(mobileData)
  }
  function logOut() {
    return signOut(auth);
  }
  const handlelogout = async () => {
    try {
      await logOut();
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
          preConfirm: () => {
            // Handle the action when clicking "Yes"
            // Hide the card and mobileData
            setMobileData('');
            setSelectedProfile('')
            setUser(false);

            // You can also navigate here if needed
            navigate('/');
            Swal.fire(
              'Logged Out',
              'You have successfully logged out.',
              'success'
            );
            // No need to return anything since we've already handled the action
          },
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(searchResult)
  const manageProfile=()=>{
    navigate('/profiles',{state:mobileData})
  }
  const addNew=()=>{
    navigate('/newProfile')
  }
  const nameData=(profileName)=>{
    setSelectedProfile(profileName)
    swal({
      text: "Switch to profile Successfully!",
      icon: "success",
      buttons: false,
      timer: 3000,
  });
    navigate('/')
    console.log('hello world')
  }
  return (
    <>
      <div class="card headerCard">
        <div class="card-body ">
          <div class="form-group">
            <img src={hamburger} className='hamburger' onClick={hamburgerHandler} />
          </div>
          <div class="form-group">
            <img src={bollywood} className=' img-bolly' />
          </div>

          <div class="form-group searchMovies">
            <form>
              <input type="text" class="form-control searchbar" onChange={(e) => {

                updateRecommendations(e.target.value);
              }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Movies" autoComplete='off' />
            </form>
            <img src={search} className='img-search' />
            
            {mobileData && loginData && user && <div class="card cardLogin" >
              <div className='cardProfile'>
                <div>
                  <h4 className=' profileAccount'>Your Account</h4>
                  <p className='text-white watchList'>WatchList</p>
                <h5 class="card-title text-white logout" onClick={handlelogout} style={{ cursor: 'pointer' }} >Logout</h5>
                  </div>         
              <div>
               <h4 className=' profileColor'>Profiles</h4>
               {
    arr.map(data=>{
    
      return (
        <>
        <p  className='text-white mainData' onClick={()=>nameData(data.name)}>{data.name||mobileData}</p>
        </>
      )
    })
   }
              <p onClick={manageProfile} className='text-white manageProfile'>Manage Profile</p>
              <div className='addNewDatas'>
              <img src="https://www.svgrepo.com/show/73554/add-round-button.svg" onClick={addNew}  className='profileSvg'/>
              <p className='text-white  text-center cursor-pointer newDatas' onClick={addNew}  style={{cursor:'pointer'}}> Add New</p>
                </div>
              </div>
              </div>
            </div>}
          

          
          </div>
          <div className='profileData'>
          <p className='text-white' onClick={()=>mobiles(mobileData)} style={{ cursor: 'pointer' }}>{selectedProfile||mobileData}</p>
          {mobileData &&<img src={profile} className='profileImg' onClick={()=>mobiles(mobileData)} />}
          </div>
        

          {!mobileData && (
            <div class="form-group signout">
              <p onClick={login} style={{ cursor: 'pointer' }}>Login</p>
            </div>
          )}
          {mobileData === "+918770770302" ? (
            <div className="form-group userAdd">
              <p onClick={addMovie}>Add User</p>
            </div>

          ) : null}

        </div>
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


    </>
  )
}
export default Header