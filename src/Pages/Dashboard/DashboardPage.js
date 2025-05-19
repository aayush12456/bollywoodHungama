import Header from "../../components/common/Header/Header"
import Sidebar from "../../components/common/Sidebar/SideBar"
import { useSelector } from "react-redux/es/hooks/useSelector"
import './DashboardPage.css'
import { Outlet } from "react-router-dom"

const Dashboard=()=>{
    const selector = useSelector((state) => state.hamburger.hamburgerToggle);
    
return (
    <>
    <div className="parentBoard" style={{zIndex:10}}>
    <Header/>
    </div>
    <div className="bigSidebar">
<Sidebar/>
    </div>
    <div className="sidebar">
    {
    selector &&<Sidebar/>
}

    </div>
    <div className="outlet"  >
    <Outlet/>
    </div>

    </>
)
}
export default Dashboard