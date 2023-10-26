import { SidebarData } from "../../../utils/constraints/SideBarData"
import SideBarMenu from "./SideBarMenu"
import './SideBar.css'
import { Link } from "react-router-dom"
const Sidebar=()=>{
    return (
        <>
        <div class="card sidebarCard" style={{backgroundColor:'#060d17'}}>
  <div class="card-body1">
    {
 SidebarData?.map((item,index)=>{
    return(
        <>
        <Link key={index} to={item.title} style={{textDecoration:'none',color:'black'}}><SideBarMenu data={item} /></Link>
        </>
    )
})
    }
  </div>
</div>
        </>
    )
    }
    export default Sidebar