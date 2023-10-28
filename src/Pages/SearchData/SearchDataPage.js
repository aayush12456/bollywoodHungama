import Footer from "../../components/common/Footer/Footer"
import SearchData from "../../searchData/searchData"
import { useLocation } from "react-router-dom"
import './SearchDataPage.css'
const SearchDataPage = () => {

    let search = useLocation()
    const searchData = search.state

    return (
        <>
            <SearchData searchDataContent={searchData} />
            <div className="searchCss">
                <Footer/>
            </div>
        </>
    )
}
export default SearchDataPage