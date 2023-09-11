import * as  Yup from "yup"
export const  AddMovieSchema=Yup.object({
    Heading: Yup.string().required('please enter Heading'),
    Id: Yup.string().required('please enter Id'),
    Title: Yup.string().max(40).required('please enter Title'),
    Rating: Yup.string().required('please enter Rating'),
    Time: Yup.string().required('please enter Time'),
    Date: Yup.string().required('please enter Date'),
    Rating: Yup.string().required('please enter Rate'),
    Genres: Yup.string().required('please enter Genres'),
    ImageUrl: Yup.string().required('please enter ImageUrl'),
    Directors: Yup.string().required('please enter Directors'),
    Starring: Yup.string().required('please enter Starring'),
    Description: Yup.string().required('please enter Description'),
    MovieId: Yup.string().required('please enter MovieId'),
    TrailerUrl: Yup.string().required('please enter TrailerUrl'),
    TrailerImage: Yup.string().required('please enter TrailerImage')
})
