
import './SideBarMenu.css'
const SideBarMenu=({data})=>{
    return (
        <>
        <div className='menu-data' >
        <img src={data.image} className="icon-img mx-4 icon "/>
        <h5 class="card-title title text-white ">{data.title}</h5>
        <p className='authdata'>{data.auth}</p>
        </div>
        </>
    )
    }
    export default SideBarMenu