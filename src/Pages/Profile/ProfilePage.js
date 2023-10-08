
import Profile from "../../Profile/Profile"
import Footer from "../../components/common/Footer/Footer"
import './ProfilePage.css'
const ProfilePage=()=>{
   
return (
    <>
    <div className="profilePage">
        <div>
        <Profile />
        </div>
        <div className="footerDiv">
        <Footer/>
        </div>
    </div>

    </>
)
}
export default ProfilePage