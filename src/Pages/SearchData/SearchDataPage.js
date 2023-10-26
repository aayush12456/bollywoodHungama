import SearchData from "../../searchData/searchData"
import { useLocation } from "react-router-dom"

const SearchDataPage = () => {

    let search = useLocation()
    const searchData = search.state

    return (
        <>
            <SearchData searchDataContent={searchData} />
        </>
    )
}
export default SearchDataPage