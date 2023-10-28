
import './Error.css'
import { useNavigate } from 'react-router-dom'
const Error=()=>{
    const navigate=useNavigate()
    const home=()=>{
    navigate('/')
    }
return (
    <>
    <div class='pt-5'>
    <p class='text-center text-white pt-5'>It's not here.</p>
<p class='text-center text-white pt-2'>There is nothing at the web address you've entered. Let's find you a great video to watch instead.</p>
<button type="button" class="btn btn-secondary mt-3" id='buttonError' onClick={home}>Go to Bollywood Hungama home</button>
    </div>

    </>
)
}
export default Error