import AllUser from "../../components/allUser/allUser"
import { useEffect ,useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllUserData } from "../../Redux/Slice/allUserSlice/allUserSlice";
const AllUserPage=()=>{
    const dispatch=useDispatch()
    const verifyOtpObj = JSON.parse(sessionStorage.getItem('verifyLoginOtpObject'));
    const id=verifyOtpObj?.loginUserObj?._id
    const getAllUser=useSelector((state)=>state?.getAllUser?.getAllUserArray?.getAllUserArray)
    // console.log('get all user is',getAllUser)
    const [getAllUserArrays,setGetAllUserArrays]=useState(getAllUser)
    const deleteProfileUser=useSelector((state)=>state?.deleteUser?.deleteUserObj?.deleteUserObj)
    // console.log('delete user obj ',deleteProfileUser)
    useEffect(()=>{
    if(id){
        dispatch(getAllUserData(id))
    }
    },[id])
    useEffect(()=>{
     if(deleteProfileUser?._id){
        const removeArray=getAllUserArrays.filter((item)=>item?._id!==deleteProfileUser?._id)
        setGetAllUserArrays(removeArray)
     }
    },[deleteProfileUser?._id,getAllUser])
return (
    <>
    {
        getAllUserArrays?.map((item)=>{
            return (
                <>
                <div key={item._id}>
   <AllUser allUserItem={item}/>
                </div>
                </>
            )
        })
    }
    </>
)
}
export default AllUserPage