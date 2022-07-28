
import Button from "../basic/Button";
import {StyledUserCard} from "../../core-ui/UserCard.style"
import unknown from "../../assets/unknown.jpg"


const UserCard = ({user,navigate,api,token}) => {

  const userId = user.user_id;


  const chatUser = async() => {

    try {
      
       console.log(userId)
       const res = await api.post(`/chat/${userId}`,{},{
       headers: {'Authorization':`Bearer ${token}`}
      });

      const payload = res.data;
      const roomId = payload.data.room_id;

      navigate(`/chat/${roomId}`);

      

   } catch(err) {

       const payload = err.response.data;
       const message = payload.message;

       // navigate to error page
       console.log(message)

   };

  }

  return (
    <StyledUserCard>
        {
            user.profile_img.length !==  26 ? <img src={user.profile_img} /> : <img src={unknown}/>
        }
        
        <div className="user-info">
             <span>{user.username}</span>
             <p>{user.isAdmin ? "Admin" : "User"} </p>
            <Button content="Say Hi" styling="primary" onPress={chatUser}/>
        </div>
    </StyledUserCard>
  )
}

export default UserCard
