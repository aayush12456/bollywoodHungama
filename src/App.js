
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/DashboardPage';
import AddMovie from './AddMovie/AddMovie';
import ShowVideo from './Pages/Video/showVideo';
import MoviePage from './Pages/Movie/MoviePage';
import MovieContentPage from './Pages/Movie/MovieContentPage';
import { useSelector } from 'react-redux';
import GenrePage from './Pages/Genre/GenrePage';
import RomancePage from './Pages/Genre/RomancePage';
import DramaPage from './Pages/Genre/DramaPage';
import KidsPage from './Pages/Genre/KidsPage';
import TamilPage from './Pages/Featured/TamilPage';
import SearchDataPage from './Pages/SearchData/SearchDataPage';
import LoginPage from './Pages/Login/LoginPage';
import ProtectedRoute from './Authenticattion/Protected/ProtectedRoute';


function App() {
  const videoSelector=useSelector(state=>state.passMovie.passMovie)
  const dataSlice=useSelector(state=>state.dataSlice)

  const title = videoSelector.Title;
  const movieId=videoSelector.MovieId
 const router= createBrowserRouter([

  {path:'',
  element:<Dashboard/>,
  children:[
    {path:'',element:<MoviePage/>},
    {path: '/movie',element:<MovieContentPage/>},
    {path: `/movie/video/${movieId}`,element:<ShowVideo/>},
    {path :'/genre/comedy',element:<GenrePage/>},
    {path :'/genre/romance',element:<RomancePage/>},
    {path :'/genre/drama',element:<DramaPage/>},
    {path :'/genre/kids',element:<KidsPage/>},
    {path :'/feature/tamil',element:<TamilPage/>},
    {path :'/search',element:<SearchDataPage/>}
  ]},
  {path:'/AddMovie',element:<AddMovie/>},
  {path:'/login',element:<LoginPage/>}
 ])
  return <RouterProvider router={router}/>
}

export default App;
