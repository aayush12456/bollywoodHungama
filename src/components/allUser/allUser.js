import { deleteUserAsync } from '../../Redux/Slice/deleteProfileUser/deleteProfileUser'
import './allUser.css'
import { useDispatch } from 'react-redux'
const AllUser=({allUserItem})=>{
    const dispatch=useDispatch()
    const deleteProfileHandler=async(allUserItem)=>{
        const deleteProfileObj={
            phone:allUserItem.phone
        }
        dispatch( deleteUserAsync(deleteProfileObj))
    }
return (
    <>
    
    <div class="card allUserCard"  >
  <div class="card-body card-user">
    <div class="card-user-details">
     <p>{allUserItem.firstName}</p>
     <p>{allUserItem.lastName}</p>
     <p>{allUserItem.email}</p>
     <p>{allUserItem.phone}</p>
     <button type="btn" class="btn btn-primary"  onClick={()=>deleteProfileHandler(allUserItem)}>
                  Delete
                  </button>
    </div>
  </div>
</div>

    </>
)
}
export default AllUser