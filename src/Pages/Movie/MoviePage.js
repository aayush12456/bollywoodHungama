
import AddMovieData from "../../Home/AddMovieData"
import Footer from "../../components/common/Footer/Footer"
import './MoviePage.css'
import {Helmet} from 'react-helmet'
const MoviePage=()=>{

return (
    <>
       <Helmet>
            <title>BollyWood Hungama | Watch movies</title>
        </Helmet>
   <div >
   <AddMovieData/>
   </div>
   <div className="mt-5 recommendCss" >
    <Footer/>
    </div>
    </>
)

}
export default MoviePage