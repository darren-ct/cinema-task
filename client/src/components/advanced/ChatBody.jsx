import StyledChatBody from "../../core-ui/ChatBody.style"
import { AppContext } from "../../App";
import { useContext } from "react";

import unknown from "../../assets/unknown.jpg"

const ChatBody = ({msg}) => {

  const{user} = useContext(AppContext);

  const myId = user.user_id;
  const isMe = msg.sender_id == myId ? true : false;

  const timeString = msg.hour.toString() + ":" + msg.minute.toString() + "," + msg.day + "-" + msg.month + "-" + msg.year;

  
  return (
    <StyledChatBody isMe={isMe}>
       {!isMe &&
        <img src={msg.profile_img.length === 26 ? unknown : msg.profile_img}/> }
        <div style={{display:"flex",flexDirection:"column"}}>
             <div className="msg-body" >
                 <div className="triangle" ></div>
                 <p className="msg">{msg.body}</p>
                 <p className="msg-time">{timeString}</p>
              </div>
              
        </div>

    </StyledChatBody>
  )
}

export default ChatBody