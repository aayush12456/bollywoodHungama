import './Header.css'
import search from '../../../assets/headericons/search.png'
import bollywood from '../../../assets/headericons/bollywood.png'
import hamburger from '../../../assets/headericons/hamburger.png'
import { useDispatch } from 'react-redux'
import { hamburgerActions } from '../../../Redux/Slice/authSlice/hamburgerSlice'
import { useNavigate } from 'react-router-dom'

const Header=()=>{
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const hamburgerHandler=()=>{
   dispatch(hamburgerActions.handleToggle())
    }
const addMovie=()=>{
  navigate('/AddMovie')
}
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
    <input type="text" class="form-control searchbar" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Movies"/>
    <img src={search} className='img-search'/> 
  </div>
  <div class="form-group signout ">
   <p>Signout</p>
  </div>
  <div class="form-group userAdd">
   <p onClick={addMovie}>Add User</p>
  </div>
  </div>
</div>
        {/* <div class="card cards" >
  <div class="card-body">
    <div >
      <img src={hamburger}className='hamburger' onClick={hamburgerHandler} />
    </div>
    <div className='title'>
<p className='heading'>Navbar</p>
    </div>
    <div className='search'>
    <input type="text" placeholder="search movies" className="input"/> 
    <img src={search} className='img'/> 
    </div>
    <div className='auth'>
     <p>Signout</p>
    </div>
    <p onClick={addMovie}>Add Movie</p>
    
  </div>
</div> */}
{/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <div className='title'>
    <a class="navbar-brand" href="#">Navbar</a>
    </div>
    <div className='searchbox'>
    <form class="d-flex search" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      </form>
    </div>
    <div className='toggle'>
    <ul class="navbar-nav me-auto mb-2 mb-lg-0 list">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
     
  </div>
</nav> */}

        </>
    )
    }
    export default Header