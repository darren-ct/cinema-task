import {StyledChatButton} from "../../core-ui/ChatButton.style"
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import image from "../../assets/chat.png"

const ChatButton = () => {
  const navigate = useNavigate();

  const styling = (isActive) => {
    if(isActive) {
        // return {
        //     opacity : "0%",
        //     visibility : "hidden"
        // }
    }
  }

  return (
    <NavLink style={styling} to="/chat/0">
    <StyledChatButton>
         <div onClick={()=>{navigate("/chat/0")}}>
              <img src={image} />
         </div>
    </StyledChatButton>
    </NavLink>
  )
}

export default ChatButton

