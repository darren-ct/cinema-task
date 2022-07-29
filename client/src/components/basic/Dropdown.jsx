import React from 'react';
import {AppContext} from "../../App"
import { useContext } from 'react';
import {NavLink} from "react-router-dom";
import logout from "../../assets/logout.png";
import { StyledDropdown } from '../../core-ui/Dropdown.style';

const Dropdown = ({isShown,btns,images,urls,styling}) => {
  const {setUser} = useContext(AppContext)
  return (
    <StyledDropdown isShown={isShown}>
       
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
             <p onClick={()=>{setUser(null);localStorage.removeItem("user")}}>Logout</p>
       </div>
    </StyledDropdown>
  )
}

export default Dropdown