import CreateProfile from "../../Profile/CreateProfile"
import Footer from "../../components/common/Footer/Footer"
import './ProfilePage.css'
const CreateProfilePage=()=>{
return (
    <>
     <div className="profilePage">
        <div>
        <CreateProfile/>
        </div>
        <div className="footerDiv">
        <Footer/>
        </div>
    </div>
    </>
)
}
export default CreateProfilePage