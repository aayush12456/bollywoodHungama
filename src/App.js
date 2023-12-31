
import './App.css';
import { RouterProvider, createBrowserRouter,Navigate } from 'react-router-dom';
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
import ProfilePage from './Pages/Profile/ProfilePage';
import NewProfilePage from './Pages/Profile/NewProfilePage';
import CreateProfilePage from './Pages/Profile/CreateProfilePage';
import DownloadPage from './Pages/Download/DownloadPage';
import StoreDataPage from './Pages/storeData/storeDataPage';
import ErrorPage from './Pages/Error/ErrorPage';
function App() {
  const videoSelector=useSelector(state=>state.passMovie.passMovie)
  const dataSlice=useSelector(state=>state.dataSlice)

  const title = videoSelector.Title;
  const movieId=videoSelector.MovieId
 const router= createBrowserRouter([

  {path:'',
  element:<Dashboard/>,
  children:[
    {
      
      path:'/',element: <Navigate to='/Home'  />
    },
    {path:'',element:<MoviePage/>},
    {path: '/movie',element:<MovieContentPage/>},
    {path: `/movie/video/${movieId}`,element:<ShowVideo/>},
    {path :'/genre/comedy',element:<GenrePage/>},
    {path :'/genre/romance',element:<RomancePage/>},
    {path :'/genre/drama',element:<DramaPage/>},
    {path :'/genre/kids',element:<KidsPage/>},
    {path :'/feature/tamil',element:<TamilPage/>},
    {path :'/search',element:<SearchDataPage/>},
    {path:'/AddMovie',element:<AddMovie/>},
    {path:'/Download',element:<DownloadPage/>},
    {path:'/Store',element:<StoreDataPage/>},
    {path:'/Categories',element:<MoviePage/>},
    {path:'/Home',element:<MoviePage/>},

  ]},

  {path:'/login',element:<LoginPage/>},
  {path:'/profiles',element:<ProfilePage/>},
  {path:'/newProfile',element:<NewProfilePage/>},
  {path:'/createProfile',element:<CreateProfilePage/>},
  {path:'/error',element:<ErrorPage/>},
  {
    path: '*',
    element: <Navigate to="/error" /> // Redirect to ErrorPage for unmatched paths
  }
 ])
  return (
    <>
    <RouterProvider router={router}/>
    
    </>
  )
}

export default App;
