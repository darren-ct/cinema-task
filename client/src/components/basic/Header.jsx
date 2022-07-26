import { NavLink, useNavigate } from 'react-router-dom';
import { useState,useEffect,useContext} from 'react';
import { AppContext } from '../../App';
import { StyledHeader } from '../../core-ui/Header.style';
import Dropdown from './Dropdown';

// images
import logo1 from "../../assets/Clogo.png"
import logo2 from "../../assets/Filmlogo.png"
import unknown from "../../assets/unknown.jpg"

import addfilm from "../../assets/addfilm.png";
import addcategory from '../../assets/category.png';
import transactionlist from "../../assets/transactionlist.png";

import favoriteList from "../../assets/favoritelist.png";
import home from "../../assets/home.png";

import profile from "../../assets/profile.png";
import Button from './Button';



const adminBtns = ["Profile","Transaction Status","Add Film","Add Category"];
const userBtns = ["Profile","My List Film","My Favorites","Home"];
const adminImages = [profile,transactionlist,addfilm,addcategory];
const userImages = [profile,addfilm,favoriteList,home];
const adminUrls = ["/myprofile","/transactionstatus","/addmovie","/addcategory"];
const userUrls = ["/myprofile","/mymovies","/myfavorites","/"]




const Header = ({isAdmin,user}) => {

  const navigate = useNavigate();
  const[modal,setModal] = useState(false);
  const[image,setImage] = useState(null)
  const {socket} = useContext(AppContext)


  const navLinkStyles = ({isActive}) => {
     if(isActive){
        return {
           color: "#CD2E71",
           cursor:"pointer",

        }
     }

     return {
         color:"#FFFFFF",
         cursor: "pointer"
     }
  }

  useEffect(()=>{
    socket.on("profile_updated", (data)=>{
        
        setImage(data.image)
    })
  },[])

  useEffect(()=>{
    if(user){
    socket.emit("get_profile", {id:user.user_id})}
  },[user])
 

  return (
    <StyledHeader modal={modal}>
        <nav className='container nav'>
            <div className='left'>
                <img src={logo1}/>
                <img src={logo2} style={{marginLeft:"-6px"}}/>
                <span style={{marginLeft: "8px",fontSize: "16px"}}>Cinema</span>
                <span style={{color: "#CD2E71",fontSize: "16px"}}>Online</span>
            </div>
            
            
            <div className='right'>
                { isAdmin && ( <> 
                             <NavLink style={navLinkStyles} to="/movies">Movies</NavLink>
                             <NavLink style={navLinkStyles} to="/categories">Categories</NavLink> 
                             </>) }

                

               {user ? <img src={image ? image :unknown} className="profile" onClick={()=>{setModal(prev => !prev)}}/> :
                <>
                  <Button content={"Login"} styling={"secondary"} onPress={()=>{navigate("/login")}}/>
                  <Button content={"Register"} styling={"primary"} onPress={()=>{navigate("/signup")}}/>
                </>
               } 
                
                <div className='triangle' ></div>
                {isAdmin ? <Dropdown isShown={modal} btns={adminBtns} urls={adminUrls} images={adminImages} styling={navLinkStyles} setModal={setModal}/> 
                : !isAdmin ? <Dropdown isShown={modal} btns={userBtns} urls={userUrls} images={userImages} styling={navLinkStyles} setModal={setModal}/> 
                : ""}
              
            </div>
            
        </nav>
    </StyledHeader>
  )
}

export default Header