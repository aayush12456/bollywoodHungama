import { movieData } from "../../../utils/constraints/ShowMovie"
import { useState,useEffect } from "react"
import AddMovieList from "./AddMovieList"
const AddMovieData=()=>{
    console.log(movieData)
    const movieArray=Object.values(movieData)// to show data in [{..},{...},{...}]
    console.log(movieArray)
    const [recommendArray, setRecommendArray] = useState([]);
    const [feelGoodArray, setFeelGoodArray] = useState([]);
    useEffect(() => { // react to many render something errors show to resolve this we use useEffect
        const newRecommendArray = movieArray.filter(item => item.Heading === 'recommend');
        setRecommendArray(newRecommendArray);
        const newFeelGoodArray= movieArray.filter(item => item.Heading === 'feelgood');
        setFeelGoodArray(newFeelGoodArray)
    }, []);
    

  return (
    <>
<AddMovieList recommendArray={recommendArray} feelGoodArray={feelGoodArray} />
    </>
)
}
export default AddMovieData

