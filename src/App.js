
import './App.css';
import { RouterProvider, createBrowserRouter,Navigate } from 'react-router-dom';
import io from "socket.io-client";
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
import DownloadPage from './Pages/Download/DownloadPage';
import StoreDataPage from './Pages/storeData/storeDataPage';
import ErrorPage from './Pages/Error/ErrorPage';
import SignUpPage from './Pages/signUp/signupPage';
import LoginOtpInput from './Authenticattion/loginOtpInput/loginOtpInput';
import { useEffect,useRef } from 'react';
import WatchlistPage from './Pages/Watchlist/watchlistPage';
import AccountAndSettingPage from './Pages/accountAndSetting/accountAndSettingPage';
import AllUserPage from './Pages/allUser/allUserPage';
import ProtectedRoute from './Authenticattion/Protected/ProtectedRoute';
function App() {
  const socketRef = useRef(null);
  const videoSelector=useSelector(state=>state.passMovie.passMovie)
  // const dataSlice=useSelector(state=>state.dataSlice)

  // const title = videoSelector.Title;
  const movieId=videoSelector.MovieId
const idObj=JSON.parse(sessionStorage.getItem('verifyLoginOtpObject'))
const id=idObj?._id
  useEffect(() => {
    if (!socketRef.current) {
      // Initialize the socket only once
      // socketRef.current = io('http://localhost:4000', {
      //   reconnection: true,           // Ensure reconnection is enabled
      //   reconnectionAttempts: 10,     // Number of reconnection attempts before giving up
      //   reconnectionDelay: 1000,      // Initial delay before first reconnection attempt
      //   reconnectionDelayMax: 5000,   // Maximum delay between reconnection attempts
      //   randomizationFactor: 0.5,     // Randomization factor for reconnection delay
      //   timeout: 20000,               // Increase the connection timeout to 20 seconds
      //   transports: ['websocket'],    // Force WebSocket transport only
      //   pingTimeout: 60000,           // Same timeout as server
      //   pingInterval: 25000,          // Same interval as server
      // });
      socketRef.current = io('https://bollywoodprojectbackend.onrender.com', {
        reconnection: true,           // Ensure reconnection is enabled
        reconnectionAttempts: 10,     // Number of reconnection attempts before giving up
        reconnectionDelay: 1000,      // Initial delay before first reconnection attempt
        reconnectionDelayMax: 5000,   // Maximum delay between reconnection attempts
        randomizationFactor: 0.5,     // Randomization factor for reconnection delay
        timeout: 20000,               // Increase the connection timeout to 20 seconds
        transports: ['websocket'],    // Force WebSocket transport only
        pingTimeout: 60000,           // Same timeout as server
        pingInterval: 25000,          // Same interval as server
      });
  
      // Emit "setup" event to the server to establish the connection with the user's id
      socketRef.current.emit("setup", id);
  
      // Listen for connection
      socketRef.current.on('connect', () => {
        console.log('Connected to server');
        console.log('Socket ID:', socketRef.current.id);  // Log the socket ID
      });
  
      // Listen for disconnection
      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from server');
      });
  
      // Additional events you might have
      socketRef.current.on("connected", () => {
        console.log('Socket is connected');
      });
    }
  
    // Clean up function to disconnect the socket on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [id]);  // Only re-run if the `id` changes
 const router= createBrowserRouter([

  {path:'',
  element:<Dashboard/>,
  children:[
    {
      
      path:'/',element: <Navigate to='/home'  />
    },
    {path:'',element:<MoviePage/>},
    {path: '/movie',element:<ProtectedRoute element={<MovieContentPage />}/>},
    {path: `/movie/video/${movieId}`,element:<ProtectedRoute element={<ShowVideo />}/>},
    {path :'/genre/comedy',element:<GenrePage/>},
    {path :'/genre/romance',element:<RomancePage/>},
    {path :'/genre/drama',element:<DramaPage/>},
    {path :'/genre/kids',element:<KidsPage/>},
    {path :'/feature/tamil',element:<TamilPage/>},
    {path :'/search',element:<SearchDataPage/>},
    {path:'/AddMovie/:admin',element:<ProtectedRoute element={<AddMovie />}/>},
    {path:'/download',element:<DownloadPage/>},
    {path:'/store',element:<StoreDataPage/>},
    {path:'/categories',element:<MoviePage/>},
    {path:'/home',element:<MoviePage/>},
    {path:'/watchlist',element:<ProtectedRoute element={<WatchlistPage />}/>},
    {path:'/accountAndSetting',element:<ProtectedRoute element={<AccountAndSettingPage />}/>},
    {path:'/allUser',element:<ProtectedRoute element={<AllUserPage />}/>},
    {path:'/profile',element:<ProtectedRoute element={<ProfilePage />}/>},
  ]},

  {path:'/login',element:<LoginPage/>},
  {path:'/verifyOtp',element:<LoginOtpInput/>},
  {path:'/signup',element:<SignUpPage/>},

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
