
import WatchList from "../../components/watchlist/watchlist"
import {Helmet} from 'react-helmet'
import '../Movie/MoviePage.css'
const WatchlistPage=()=>{
return (
    <>
     <Helmet>
            <title>BollyWood Hungama : Your WatchList</title>
        </Helmet>
    <WatchList/>
  
    </>
)
}
export default WatchlistPage