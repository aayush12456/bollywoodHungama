const ShowMovie=async()=>{
    const response =await fetch('https://movieproject-e1e03-default-rtdb.firebaseio.com/moviePoster.json')
    const data =await response.json()
   return data
}
export const movieData = await ShowMovie();