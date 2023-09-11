import './AddMovieList.css'
import { useState, useEffect,useRef } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import rightArrow from '../../../assets/buttonicons/rightArrow.svg'
import leftArrow from '../../../assets/buttonicons/leftArrow.svg'
const AddMovieList = ({ recommendArray, feelGoodArray }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const movieSelector = useSelector(state => state.passMovie.passMovie)
  const [show, setShow] = useState(false)
  const [activeIndex, setActiveIndex] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const cardGridRef = useRef(null);
  console.log(recommendArray)
  const navigate = useNavigate()
  const title = movieSelector?.Title
  const isMobileView = window.innerWidth <= 500; 
  const movieClickHandler = (item) => {
    navigate('/movie', { state: item });

  }
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(recommendArray.length / itemsPerSlide);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    setActiveIndex(false);
  }
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    setActiveIndex(true);
  };
  const mousEnter = (index) => {
    setHoveredIndex(index)
    setShow(true)
  }
  const mouseLeave = () => {
    setHoveredIndex(-1)
    setShow(false)
  }

  const startIndex = currentSlide * itemsPerSlide;
  const endIndex = startIndex + itemsPerSlide;
  const currentMovies = recommendArray.slice(startIndex, endIndex);
  const touchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const touchMove = (event) => {
    if (touchStartX !== null) {
      setTouchEndX(event.touches[0].clientX);
    }
  };

  const touchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const deltaX = touchStartX - touchEndX;
      if (deltaX > 50) {
        // Swipe left
        nextSlide();
      } else if (deltaX < -50) {
        // Swipe right
        prevSlide();
      }
      setTouchStartX(null);
      setTouchEndX(null);
      if (cardGridRef.current) {
        requestAnimationFrame(() => {
          cardGridRef.current.classList.toggle("transformed");
        });
      }
    }
    
  };
  
  return (
    <>

      <div>


        <h4 style={{ color: 'white' }} className=" headingTitle">
          Recommended Movie
        </h4>
      </div>
   
      <div  className={`cardGrid ${isMobileView ? 'mobileView' : ''}`}
        ref={cardGridRef} 
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
         >
        {currentMovies.map((item, index) => (
          
          <div key={index} className='card-container' onMouseEnter={() => mousEnter(index)} onMouseLeave={mouseLeave}>
            <div class="card cardShow " >
              <img src={item.ImageUrl} class="card-img-top" alt="..." onClick={() => movieClickHandler(item)} />
              <div class={`card-body card-body2 ${hoveredIndex === index ? 'hovered' : ''}`}>
                <h5 class="card-title" onClick={() => movieClickHandler(item)}>{item.Title}</h5>
                <p class="card-text" onClick={() => movieClickHandler(item)}>{item.Description}</p>
              </div>
            </div>
            {hoveredIndex === index && show && (
              <>
                {!activeIndex && (
                  <img src={leftArrow} className='leftArrow' onClick={prevSlide} />
                )}
                <img src={rightArrow} alt='prev' className='rightArrow' onClick={nextSlide} />
              </>
            )}
          </div>
        ))}
      </div>
      <div>
     W
        <h4 style={{ color: 'white' }} className="pt-4 headingTitle1 ">
          Feel Good Movie
        </h4>
      </div>

      {feelGoodArray.map((item) => (
        <div class="card" style={{ width: '18rem', marginLeft: '24rem' }}>
          <img src={item.ImageUrl} class="card-img-top" alt="..." onClick={() => movieClickHandler(item)} />
          <div class="card-body">
            <h5 class="card-title">{item.Title}</h5>
          </div>
        </div>
      ))}

    </>
  )
}
export default AddMovieList