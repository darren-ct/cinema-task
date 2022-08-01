import React from 'react';
import {AppContext} from "../../App"
import { useContext } from 'react';
import {NavLink,useNavigate} from "react-router-dom";
import logout from "../../assets/logout.png";
import { StyledDropdown } from '../../core-ui/Dropdown.style';

const Dropdown = ({isShown,btns,images,urls,styling,setModal}) => {
  const {setUser} = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <StyledDropdown isShown={isShown} setModal={setModal}>
       
       {btns.map((btn,index) => {
        return (
          <div className='link' key={index}>
                <img src={images[index]} />
                <NavLink style={styling} to={urls[index]}>{btn}</NavLink>
          </div>
        )
       })}
       <div className='link logout'>
             <img src={logout} />
             <p onClick={()=>{setUser(null);localStorage.removeItem("user");setModal(false);navigate("/")}}>Logout</p>
       </div>
    </StyledDropdown>
  )
}

export default Dropdown