import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase.js';
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const playVideos = useSelector(state => state.passMovie.passMovie);
    const movieId = playVideos.MovieId;
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    if (!user) {
      // Redirect to the login page if the user is not authenticated
      return <Navigate to="/login" />;
    }
   else if (user) {
      // Redirect to the login page if the user is not authenticated
      return <Navigate to="" />;
    }
     return children;
  };
  

export default ProtectedRoute;