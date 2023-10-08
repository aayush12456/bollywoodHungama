const ShowProfile=async()=>{
    const response =await fetch('https://movieproject-e1e03-default-rtdb.firebaseio.com/movieProfile.json')
    const data =await response.json()
   return data
}
export const profileData = await ShowProfile();