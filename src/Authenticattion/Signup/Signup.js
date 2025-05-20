import './signup.css'
import bollywood from '../../../src/assets/headericons/bollywood.png'
import { useFormik } from "formik";
import { signUpSchema } from '../../schemas';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { userRegisterAsync } from '../../Redux/Slice/registerSlice/registerSlice';
import { useEffect } from 'react';
import { resetRegisterState } from '../../Redux/Slice/registerSlice/registerSlice';
import swal from 'sweetalert';
const SignUp=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const registerSelector=useSelector((state)=>state.registerData.registerData.mssg)
    // console.log('register response',registerSelector)
    const initialValues = {
       firstName:"",
       lastName:"",
       Email:"",
       Phone:""
      };
      const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      } = useFormik({
        initialValues: initialValues,
        validationSchema:signUpSchema,
        onSubmit: (values, action) => {
          action.resetForm();
          const signupObj={
            firstName:values.firstName,
            lastName:values.lastName,
            email:values.Email,
            phone:values.Phone
          }
        //  console.log('signup data',signupObj)
         dispatch(userRegisterAsync(signupObj))
         swal({
          text: "Account created successfully",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        },
      })
      useEffect(()=>{
      if(registerSelector){
      navigate('/')
      dispatch(resetRegisterState());
      }
      },[registerSelector,dispatch,navigate])
return (
    <>
    <div>
    <div  class='bollyImg'>
        <img src={bollywood} class="bollysImg" alt='bollywood'/>
    </div>
    <div id='primeSign'>
    <div class="card" id='cardsPrime' >
  <div class="card-body4">
   <p class="signup">Sign Up</p>
   <form onSubmit={handleSubmit}>
    <div style={{marginLeft:12,marginRight:12}}>
    <div class="mb-3">
    <input type="text" class="form-control" id="exampleInputEmail  " onChange={handleChange}
     onBlur={handleBlur}  value={values.Name}  name='firstName' aria-describedby="emailHelp"  placeholder='Enter your first name' />
    {errors.firstName && touched.firstName ? <p className='text' >{errors.firstName}</p> : null}
  </div>
  <div class="mb-3">
    <input type="text" class="form-control" id="exampleInputEmail " onChange={handleChange}
     onBlur={handleBlur}  value={values.lastName}  name='lastName' aria-describedby="emailHelp"  placeholder='Enter your last name' />
    {errors.lastName && touched.lastName ? <p className='text' >{errors.lastName}</p> : null}
  </div>
  <div class="mb-3">
    <input type="email" class="form-control" id="exampleInputEmail " onChange={handleChange}
     onBlur={handleBlur}  name='Email'  value={values.Email} aria-describedby="emailHelp" placeholder='Enter your email'/>
    {errors.Email && touched.Email ? <p className='text' >{errors.Email}</p> : null}
  </div>
  <div class="mb-3 ml-5">
    <input type="text" class="form-control"  id="exampleInputEmail " onChange={handleChange}
     onBlur={handleBlur}  name='Phone' value={values.Phone} aria-describedby="emailHelp" placeholder='Enter your phone number'/>
    {errors.Phone && touched.Phone ? <p className='text' >{errors.Phone}</p> : null}
  </div>
    </div>
    <div style={{display:'flex',justifyContent:'center'}}>
  <button type="submit" class="btn btn-primary" style={{marginBottom:12,width:'50%'}}>Submit</button>
    </div>
    <p style={{textAlign:'center',paddingLeft:5,paddingRight:5}}>By continuing, you agree to the bollywood hungama<span style={{color:'blue',cursor:'pointer'}}> Conditions of Use and Privacy Notice.</span></p>
</form>
  </div>
</div>
    </div>
    </div>
    </>
)
}
export default SignUp