
import { Link } from 'react-router-dom'
import './SideBarMenu.css'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { hamburgerActions } from '../../../Redux/Slice/authSlice/hamburgerSlice'
const SideBarMenu = ({ data }) => {
  const dispatch=useDispatch()
  const [upimg, setUpImg] = useState(true)
  const [nameupimg, setnameUpImg] = useState(true)
  const [genreupimg, setgenreUpImg] = useState(true)
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
  
 
  const tamilClickHandler=()=>{
    setUpImg(true)
    setnameUpImg(true)
    dispatch(hamburgerActions.handleToggle())
  }
  const anotherClickHandler=()=>{
    setgenreUpImg(true)
    setUpImg(true)
    setnameUpImg(true)
    dispatch(hamburgerActions.handleToggle())
  }
  return (
    <>
      <div className='menu-data' >
        <img src={data.image} className="icon-img mx-4 icon " alt='menuImage' />
        <h5 class="card-title title text-white ">{data.title}</h5>
        {/* {!profileName.profileData ? (
  <p className='authdata text-white' onClick={authData}>{data.auth}</p>
  
) :null} */}
   {/* { profileName.profileData==='+918770770302'? (<Link to='/AddMovie' style={{textDecoration:'none'}}> <p className='AddMovie text-white'   >{data.titles}</p>    </Link>):null} */}
      </div>
      <div>
        {upimg && <img src={data.downArrow} className='downArrow' alt=''  onClick={downClick} />}
        {!upimg && <img src={data.upArrow} className='downArrow' alt=''  onClick={upClick} />}
        <div>

          {!upimg && <h5 className='text-white name'>{data.feature?.name}</h5>}
          {!upimg && nameupimg && <img src={data.feature?.downArrow} className='downArrow' alt=''  onClick={namedownClick} />}
          {!nameupimg && <img src={data.feature?.upArrow} className='downArrow' alt=''   onClick={nameupClick} />}
          {
            !nameupimg && data.feature?.array.map(item => {
              // console.log('item is',item)
              const language = item.link
              return (
                <>
                  {<Link to={language} style={{ textDecoration: 'none' }} onClick={tamilClickHandler}><h6 className='text-white language' style={{marginTop:'-1rem'}} >{item.language}</h6></Link>}
                </>
              )
            })
          }
          {!upimg && <h5 className='text-white name'>{data.genre?.name}</h5>}
          {!upimg && genreupimg && <img src={data.genre?.downArrow} className='downArrow' alt='' onClick={genredownClick} />}
          {!genreupimg && <img src={data.genre?.upArrow} className='downArrow' alt='' onClick={genreupClick} />}
          <div style={{marginTop:'-1.3rem'}}>
          {
            !genreupimg && data.genre?.array.map(item => {
              // console.log(item)
              const language = item.link
              return (
                <>
                  {<Link to={language}  style={{ textDecoration: 'none' }} onClick={anotherClickHandler}><h6 className='text-white language' >{item.language}</h6></Link>}
                </>
              )
            })

          }
            </div>       
        </div>
      </div>
      
    </>
  )
}
export default SideBarMenu