import home from '../../assets/sidebaricons/homeicon.svg'
import store from '../../assets/sidebaricons/shop.png'
import download from '../../assets/sidebaricons/download.png'
import categories from '../../assets/sidebaricons/category.png'
import upArrow from '../../assets/sidebaricons/upArrow.svg'
import leftArrow from '../../assets/sidebaricons/leftArrow.svg'
import rightArrow from '../../assets/sidebaricons/rightArrow.svg'
import downArrow from '../../assets/sidebaricons/downArrow.svg'
export const SidebarData=[
    {
        id:'1',title:'Home',image:home,link:'/home'
    },
    {
        id:'2',title:'Store',image:store,link:'/store'
    },
    {
        id:'4',title:'Categories',image:categories,leftArrow:leftArrow,rightArrow:rightArrow,upArrow:upArrow,downArrow:downArrow,
       feature: {name:'Featured Collections',upArrow:upArrow,downArrow:downArrow,array:[{language:'Tamil',link: '/feature/tamil'}]},
       genre: {name:'Genre',upArrow:upArrow,downArrow:downArrow,
       array:[{language:'Comedy',link: '/genre/comedy' },{language:'Romance',link: '/genre/romance'},{language:'Drama',link: '/genre/drama'},{language:'Kids',link: '/genre/kids'}]},
 
    },
    {
        id:'5',title:'Download',image:download,link:'/download'
    },
         
]