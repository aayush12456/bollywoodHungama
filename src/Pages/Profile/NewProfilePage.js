import NewProfile from "../../Profile/NewProfile"
import Footer from "../../components/common/Footer/Footer"
import './ProfilePage.css'
const NewProfilePage=()=>{
return (
    <>
  <div className="profilePage">
        <div>
        <NewProfile/>
        </div>
        <div className="footerDiv">
        <Footer/>
        </div>
    </div>
    </>
)
}
export default NewProfilePage