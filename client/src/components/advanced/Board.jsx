import {StyledBoard} from "../../core-ui/Board.style"
import Button from "../basic/Button"
import api from "../../connection";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";

const Board = ({movie}) => {
  const{token} = useContext(AppContext);
  const navigate = useNavigate();

  const buyMovie = async() => {

    try {
      const response =await api.post("/transaction",{
       idMovie : movie.id
      },{
       headers: {'Authorization':`Bearer ${token}`}
       });

       // token
       const snapToken = response.data.payment.token;

       window.snap.pay(snapToken , {
         onSuccess : (result) => {
           console.log(result);
           navigate("/myprofile")
         },
         onPending : (result) => {
           console.log(result);
           navigate("/myprofile")
         },

         onError : (result) => {
           console.log(result);

         },

         onClose : (result) => {
           alert("You closed without finishing the paycheck")
         }
       })



       
 } catch(err) {

   console.log(err)

 }
  };


  return (
    <StyledBoard>
        <img src={movie.image} />
        <div className="board-title">{movie.title}</div>
        <div className="category">{movie.category}</div>
        <div className="price">Rp.{movie.price}</div>
        <div className="desc">{movie.desc}</div>
        {movie.isBought ? <Button content="See Details" styling="primary" onPress={()=>{navigate(`/detail/${movie.id}`)}}/>: <Button content="Buy Now" styling="primary" onPress={buyMovie}/>}
        
    </StyledBoard>
  )
}

export default Board