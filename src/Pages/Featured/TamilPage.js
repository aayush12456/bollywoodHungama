import AddTamilData from "../../Genre/Tamil/AddTamilData"
import Footer from "../../components/common/Footer/Footer"
import'./TamilPage.css'
import {Helmet} from 'react-helmet'
const TamilPage=()=>{
return (
    <>
         <Helmet>
            <title>BollyWood Hungama | Watch Tamil Movies</title>
        </Helmet>
    <AddTamilData/>
    <div className="mt-5 tamilCss">
    <Footer/>
    </div>
    </>
)
}
export default TamilPage