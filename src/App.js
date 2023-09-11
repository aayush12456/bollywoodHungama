
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/DashboardPage';
import AddMovie from './components/common/AddMovie/AddMovie';
import ShowVideo from './Pages/Video/showVideo';
import MoviePage from './Pages/Movie/MoviePage';
import MovieContentPage from './Pages/Movie/MovieContentPage';
import { useSelector } from 'react-redux';
function App() {
  const videoSelector=useSelector(state=>state.passMovie.passMovie)
  const title = videoSelector.Title;
  const movieId=videoSelector.MovieId
 const router= createBrowserRouter([
  {path:'',
  element:<Dashboard/>,
  children:[
    {path:'',element:<MoviePage/>},
    {path: '/movie',element:<MovieContentPage/>},
    {path: `/movie/video/${movieId}`,element:<ShowVideo/>}
  ]},
  {path:'/AddMovie',element:<AddMovie/>},
 ])
  return <RouterProvider router={router}/>
}

export default App;
