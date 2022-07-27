import React from 'react'

import StyledUserChat from "../../core-ui/UserChat.style"
import unknown from "../../assets/unknown.jpg"

const UserChat = ({person,setActivePerson,setClickedPerson,clickedPerson}) => {
  const Clicked = person.user_id == clickedPerson ? true : false; 
  
  const timeString = person.hour.toString() + ":" + person.minute.toString() + ", " + person.day + "-" + person.month + "-" + person.year;
  const croppedMessage = person.last_msg.slice(0,14) + "....";

  return (
    <div onClick={()=>{setClickedPerson(person.user_id);setActivePerson(person.room_id)}}>
    <StyledUserChat Clicked={Clicked}>
        <img src={person.profile_img.length === 26 ? unknown : person.profile_img} />
        <div>
             <span>{person.username}</span>
             <p>{croppedMessage}</p>
        </div>
        <span className="time">{timeString}</span>
    </StyledUserChat>
    </div>
  )
}



export default UserChat