import './Header.css'
import search from '../../../assets/headericons/search.png'
import bollywood from '../../../assets/headericons/bollywood.png'
import hamburger from '../../../assets/headericons/hamburger.png'
import { useDispatch } from 'react-redux'
import { hamburgerActions } from '../../../Redux/Slice/authSlice/hamburgerSlice'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { movieData } from '../../../utils/constraints/ShowMovie'
import { useLocation } from 'react-router-dom'
import { auth } from '../../../firebase/firebase'
import { signOut } from 'firebase/auth'
const Header=()=>{
  const dispatch=useDispatch()
  const navigate=useNavigate()
    let mobile=useLocation()
    console.log(mobile )
  const [searchItem,setSearch]=useState(true)
  const [recommendations, setRecommendations] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const movieArray = Object.values(movieData);
  const [mobileItem,setMobile]=useState(false)
  const [mobileData,setMobileData]=useState(" ")
  const [loginData,setLogin]=useState(true)
  const [user, setUser] = useState(false);
  useEffect(()=>{
   
    const mobileData=mobile.state
    setMobileData(mobileData)
   },[])

  const hamburgerHandler=()=>{
   dispatch(hamburgerActions.handleToggle())
    }
const addMovie=()=>{
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
const searchTitleData=(recommendation)=>{
navigate('/search',{state:recommendation})
setRecommendations([])
}
const login=()=>{
  navigate('/login')
}
const mobiles=()=>{
setMobile(true)
setUser(!user)
}
function logOut() {
  return signOut(auth);
}
const handlelogout = async () => {
  try {
    await logOut();
    navigate("/");
    setMobileData(" ")
    setLogin(false)
  } catch (error) {
    console.log(error.message);
  }
};
console.log(searchResult)
    return (
        <>
        <div class="card headerCard">
  <div class="card-body ">
  <div class="form-group">
  <img src={hamburger}className='hamburger' onClick={hamburgerHandler} />
  </div>
  <div class="form-group">
  <img src={bollywood} className=' img-bolly'/>
  </div>
  
  <div class="form-group searchMovies">
    <form>
    <input type="text" class="form-control searchbar" onChange={(e) => {
         
                updateRecommendations(e.target.value);
              }} id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder="Search Movies" autoComplete='off'/>
    </form>
    <img src={search} className='img-search'/>
 
   {mobileData && loginData && user && <div class="card cardLogin
   " >
  <div class="card-body">
    <h5 class="card-title" onClick={handlelogout} >Logout</h5>
  </div>
</div>} 
  </div>
  <p className='text-white' onClick={mobiles}>{mobileData}</p>

  {!mobileData  && (
  <div class="form-group signout">
    <p onClick={login}>Login</p>
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
              <ul style={{display:"grid",gridTemplateColumns:'1fr',gap:'1.4rem'}}>
                {recommendations.map((recommendation) => (
                  <li key={recommendation.id} style={{listStyleType:'none',cursor:'pointer'}} onClick={()=>searchTitleData(recommendation)}>{recommendation.Title}</li>
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