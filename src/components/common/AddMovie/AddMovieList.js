import './AddMovieList.css'
import { useState, useEffect,useRef } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const AddMovieList = ({ movies,index }) => {

  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const movieSelector = useSelector(state => state.passMovie.passMovie)
  const [show, setShow] = useState(false)



  const navigate = useNavigate()
  const title = movieSelector?.Title
  const movieClickHandler = (movies) => {
    navigate('/movie', { state: movies });

  }
 
  const mousEnter = (index) => {
    setHoveredIndex(index)
    setShow(true)
  }
  const mouseLeave = () => {
    setHoveredIndex(-1)
    setShow(false)
  }
 



  
  return (
    <>

    
   
      <div 
        
         >
         <div  className='card-container' onMouseEnter={() => mousEnter(index)} onMouseLeave={mouseLeave}>
            <div class="card cardShow " >
              <img src={movies.ImageUrl} class="card-img-top" alt="..." onClick={() => movieClickHandler(movies)} />
              <div class={`card-body card-body2 ${hoveredIndex === index ? 'hovered' : ''}`}>
                <h5 class="card-title" onClick={() => movieClickHandler(movies)}>{movies.Title}</h5>
                <p class="card-text" onClick={() => movieClickHandler(movies)}>{movies.Description}</p>
              </div>
            </div>
           
          </div>
      </div>
    
     

    </>
  )
}
export default AddMovieList