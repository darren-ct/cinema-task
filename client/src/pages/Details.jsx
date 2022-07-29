import {useParams,useNavigate} from "react-router-dom";
import { useEffect,useState,useContext } from "react";

import {AppContext} from "../App"
import StyledDetail from "../core-ui/pages/StyledDetail.js";

import api from "../connection"
import Button from "../components/basic/Button";


const Details = () => {
  let {id} = useParams();
  const {token} = useContext(AppContext);
  const navigate = useNavigate();

  // States
  const[movie,setMovie] = useState({
    image : "",
    title: "",
    desc:"",
    price:""
  })

  

  // UseEffect
  useEffect(()=>{
      getMovie();
  },[]);

  useEffect(()=>{
         const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
         const myMidtransClientKey = "SB-Mid-client-GzKNSNXN6DWc-bq1";

         let scriptTag = document.createElement("script");
         scriptTag.src = midtransScriptUrl;

         scriptTag.setAttribute("data-client-key", myMidtransClientKey);

         document.body.appendChild(scriptTag);

         return () => {
          document.body.removeChild(scriptTag)
         }
  },[])

  // Function
  const getMovie = async() => {

    try {

      const res = await api.get(`/movie/${id}`, {
        headers: {'Authorization':`Bearer ${token}`}
        });

      
      // Extract data
      const payload = res.data;
      const movie = payload.data.movie;


   

      setMovie(movie);
      

    } catch (err) {
      const payload = err.response.data;
      const message = payload.message;

      // navigate to error page
      console.log(message)
      
    };

  };

  const buyMovie = async() => {
    try {
         const response =await api.post("/transaction",{
          idMovie : id
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
  }
  
 
  const setFavorite = async() => {
 
    try {
      if(movie.isFavorite){
         await api.delete(`/favorite/${id}`,{
          headers: {'Authorization':`Bearer ${token}`}
         })
      } else {
         await api.post("/favorite", {
          id : id
         }, {
          headers: {'Authorization':`Bearer ${token}`}
         })
      };

      getMovie()

  } catch(err) {
    const payload = err.response.data;
    const message = payload.message;

    // navigate to error page
    console.log(err)
    console.log(message)
  }
  }


  return (
    <StyledDetail>
          <img src={movie.image} />
          <div className="right-section">
                <span style={{display:"inline-block"}} className="movie-title">{movie.title}</span>
                {!movie.isBought || movie.isBought === "failed" && <Button content="Buy Now" onPress={buyMovie} width="" styling="primary"/> }
                {movie.isBought === "success" ?
                <iframe style={{marginTop:24}} src={`https://www.youtube.com/embed/${movie.link}`} width="500" height="380" frameBorder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                allowFullScreen title="Embedded youtube"  ></iframe> : movie.isBought === "pending" ? 
                <button className="finish-btn">Finish payment to watch movie</button> : ""}

                <p className="category">
                  {movie.category}
                </p>

                <p className="movie-desc">
                   {movie.desc}
                </p>

                <div className="movie-details">
                    <div className="price">Rp. {movie.price}</div>
                </div>
                

               
               { movie.isFavorite ? 
               <Button onPress={setFavorite} styling="secondary" width="full" content="Remove from favorites"/> : <Button onPress={setFavorite} styling="primary" width="full" content="Add to favorites"/> }
               
          </div>
    </StyledDetail>

  )
}

export default Details