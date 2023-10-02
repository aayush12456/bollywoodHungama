import bollywood from '../../../assets/headericons/bollywood.png'
import './Footer.css'
const Footer=()=>{
return (
    <>
    <div>
    <div className="footerContainer">
      <img src={bollywood} className='footerImg' alt="Bollywood Logo" />
    </div>
    <div className='footerData' >
        <h6 className='terms'>Terms and Privacy Notice</h6>
        <h6 className='terms'>Send us Feedback</h6>
        <h6 className='terms'>help</h6>
        <h6 className='policy'>© 1996-2023, BollywoodHungama.com, Inc. or its affiliates</h6>
    </div>
    </div>
    
    </>
)
}
export default Footer