
import { Link } from 'react-router-dom'
import './SideBarMenu.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const SideBarMenu = ({ data }) => {

  const dispatch = useDispatch()
  const [upimg, setUpImg] = useState(true)
  const [nameupimg, setnameUpImg] = useState(true)
  const [genreupimg, setgenreUpImg] = useState(true)
  const navigate=useNavigate()
  const profileName=useSelector(state=>state.profileData)
  const downClick = () => {
    setUpImg(false)
  }

  const upClick = () => {
    setUpImg(true)
  }

  const namedownClick = () => {
    setnameUpImg(false)
  }

  const nameupClick = () => {
    setnameUpImg(true)
  }

  const genredownClick = () => {
    setgenreUpImg(false)
  }

  const genreupClick = () => {
    setgenreUpImg(true)
  }
  const authData=()=>{
  navigate('/login')
  }
  const sidebarTitle=()=>{
    navigate('/AddMovie')
  }
  return (
    <>
      <div className='menu-data' >
        <img src={data.image} className="icon-img mx-4 icon " />
        <h5 class="card-title title text-white ">{data.title}</h5>
        {!profileName.profileData ? (
  <p className='authdata text-white' onClick={authData}>{data.auth}</p>
  
) :null}
   { profileName.profileData==='+918770770302'? (<Link to='/AddMovie' style={{textDecoration:'none'}}> <p className='AddMovie text-white'   >{data.titles}</p>    </Link>):null}
      </div>
      <div>
        {upimg && <img src={data.downArrow} className='downArrow' onClick={downClick} />}
        {!upimg && <img src={data.upArrow} className='downArrow' onClick={upClick} />}
        <div>

          {!upimg && <h5 className='text-white name'>{data.feature?.name}</h5>}
          {!upimg && nameupimg && <img src={data.feature?.downArrow} className='downArrow' onClick={namedownClick} />}
          {!nameupimg && <img src={data.feature?.upArrow} className='downArrow' onClick={nameupClick} />}
          {
            !nameupimg && data.feature?.array.map(item => {
              const language = item.language
              return (
                <>
                  {<Link to={`/feature/${language}`} style={{ textDecoration: 'none' }}><h6 className='text-white language'>{item.language}</h6></Link>}
                </>
              )
            })
          }
          {!upimg && <h5 className='text-white name'>{data.genre?.name}</h5>}
          {!upimg && genreupimg && <img src={data.genre?.downArrow} className='downArrow' onClick={genredownClick} />}
          {!genreupimg && <img src={data.genre?.upArrow} className='downArrow' onClick={genreupClick} />}
          {
            !genreupimg && data.genre?.array.map(item => {
              // console.log(item)
              const language = item.language
              return (
                <>
                  {<Link to={`/genre/${language}`} style={{ textDecoration: 'none' }}><h6 className='text-white language'>{item.language}</h6></Link>}
                </>
              )
            })

          }
       
        </div>
      </div>
    </>
  )
}
export default SideBarMenu