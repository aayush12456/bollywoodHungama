import './AddMovieList.css'
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth';
const AddMovieList = ({ movies,index }) => {

  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const movieSelector = useSelector(state => state.passMovie.passMovie)
  const [show, setShow] = useState(false)
  const [user, setUser] = useState(null);

  const navigate = useNavigate()
  const title = movieSelector?.Title
 
  const mousEnter = (index) => {
    setHoveredIndex(index)
    setShow(true)
  }
  const mouseLeave = () => {
    setHoveredIndex(-1)
    setShow(false)
  }
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
 const movieClickHandler = (movies) => {
    if (user) {
      navigate('/movie', { state: movies });
    } else {
      navigate('/login');
    }

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