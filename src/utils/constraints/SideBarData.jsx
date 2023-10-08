import home from '../../assets/sidebaricons/homeicon.svg'
import store from '../../assets/sidebaricons/shop.png'
import download from '../../assets/sidebaricons/download.png'
import categories from '../../assets/sidebaricons/category.png'
import channels from '../../assets/sidebaricons/network.png'
import upArrow from '../../assets/sidebaricons/upArrow.svg'
import leftArrow from '../../assets/sidebaricons/leftArrow.svg'
import rightArrow from '../../assets/sidebaricons/rightArrow.svg'
import downArrow from '../../assets/sidebaricons/downArrow.svg'
export const SidebarData=[
    {
        id:'1',title:'Home',image:home
    },
    {
        id:'2',title:'Store',image:store
    },
    {
        id:'4',title:'Categories',image:categories,leftArrow:leftArrow,rightArrow:rightArrow,upArrow:upArrow,downArrow:downArrow,
  
       feature: {name:'Featured Collections',upArrow:upArrow,downArrow:downArrow,array:[{language:'Tamil'}]},
       genre: {name:'Genre',upArrow:upArrow,downArrow:downArrow,array:[{language:'Comedy'},{language:'Romance'},{language:'Drama'},{language:'Kids'}]},
 
    },
    {
        id:'5',title:'Download',image:download
    },
    {
   id:'6',auth:'SignOut',image:''
    },
    
]