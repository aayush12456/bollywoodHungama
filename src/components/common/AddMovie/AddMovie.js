import { AddMovieData } from '../../../Redux/Slice/movieSlice/movieSlice'
import { AddMovieSchema } from '../../../schemas'
import './AddMovie.css'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
const initialValues = {
  Heading: '',
  Id: '',
  Title: '',
  Rating: '',
  Time: '',
  Date: '',
  Genres: '',
  ImageUrl: '',
  Directors: '',
  Starring: '',
  Description: '',
  MovieId:'',
  TrailerUrl:'',
  TrailerImage:''

}
const AddMovie = () => {
  const dispatch=useDispatch()
  const { values, errors, handleBlur, handleChange, touched,handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema:AddMovieSchema,
    onSubmit: (values,action) => {
      action.resetForm()
      dispatch(AddMovieData(values))
    }
  })
  return (
    <>
      <div class="card movieCard mx-auto col-10 col-md-8 col-lg-6 mt-5">
        <h1 className='text-center col-12 mt-4'>Add Movie</h1>
        <form onSubmit={handleSubmit}>
        <div class="card-body mt-2 card-input">
          <div class="mb-3">
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Heading"
             name='Heading' value={values.Heading} onChange={handleChange} onBlur={handleBlur} />
            {errors.Heading && touched.Heading? <p className='text' >{errors.Heading}</p>:null}
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Id" name='Id'
             value={values.Id}  onChange={handleChange} onBlur={handleBlur} />
                {errors.Id && touched.Id? <p  className='text'>{errors.Id}</p>:null}
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Title" name='Title'
             value={values.Title}  onChange={handleChange} onBlur={handleBlur} />
                {errors.Title && touched.Title? <p  className='text'>{errors.Title}</p>:null}
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Rating" name='Rating' 
            value={values.Rating}  onChange={handleChange} onBlur={handleBlur} />
               {errors.Rating && touched.Rating? <p  className='text'>{errors.Rating}</p>:null}
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Time" name='Time' 
            value={values.Time}  onChange={handleChange} onBlur={handleBlur} />
               {errors.Time && touched.Time? <p  className='text'>{errors.Time}</p>:null}
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Date" name='Date'
             value={values.Date}  onChange={handleChange} onBlur={handleBlur} />
                {errors.Date && touched.Date? <p  className='text'>{errors.Date}</p>:null}
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Genres" name='Genres' 
            value={values.Genres}  onChange={handleChange} onBlur={handleBlur} />
               {errors.Genres && touched.Genres? <p  className='text'> {errors.Genres}</p>:null}
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Image url" name='ImageUrl' 
            value={values.ImageUrl}  onChange={handleChange} onBlur={handleBlur} />
               {errors.ImageUrl && touched.ImageUrl? <p  className='text'>{errors.ImageUrl}</p>:null}
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Directors" name='Directors'
             value={values.Directors}  onChange={handleChange} onBlur={handleBlur} />
                {errors.Directors && touched.Directors? <p  className='text'> {errors.Directors}</p>:null}
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Starring" name='Starring'
             value={values.Starring}  onChange={handleChange} onBlur={handleBlur} />
                {errors.Starring && touched.Starring? <p  className='text'>{errors.Starring}</p>:null}
          </div>
          <div class="mb-3">
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Description" name='Description'
           value={values.Description}  onChange={handleChange} onBlur={handleBlur} />
              {errors.Description && touched.Description? <p  className='text'>{errors.Description}</p>:null}
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="MovieId" name='MovieId'
           value={values.MovieId}  onChange={handleChange} onBlur={handleBlur} />
              {errors.MovieId && touched.MovieId? <p  className='text'>{errors.MovieId}</p>:null}
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="TrailerUrl" name='TrailerUrl'
           value={values.TrailerUrl}  onChange={handleChange} onBlur={handleBlur} />
              {errors.TrailerUrl && touched.TrailerUrl? <p  className='text'>{errors.TrailerUrl}</p>:null}
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="TrailerImage" name='TrailerImage'
           value={values.TrailerImage}  onChange={handleChange} onBlur={handleBlur} />
              {errors.TrailerImage && touched.TrailerImage? <p  className='text'>{errors.TrailerImage}</p>:null}
        </div>
        <button type="Submit" class="btn btn-primary mt-5  buttons ">Add Movie</button>
        </div>
        </form>
       
      </div>
    </>
  )
}
export default AddMovie