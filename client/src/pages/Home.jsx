import { useState,useEffect,useContext } from "react";
import {useNavigate} from "react-router-dom";

import {AppContext} from "../App"

import Board from "../components/advanced/Board";
import StyledHome from "../core-ui/pages/Home.style";
import MovieCard from "../components/advanced/MovieCard";
import api from "../connection";
import { api2 } from "../connection";

import Swiper from "swiper/bundle";
import "swiper/css/bundle";




const Home = () => {
  let navigate = useNavigate();
  const swiper = new Swiper(".swiper", {
    direction : "horizontal",
    loop : false,
  
    pagination : {
      el: ".swiper-pagination"
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  

  const[movies,setMovies] = useState([]);
  const[isLoading,setIsLoading] = useState(false);

  const[search,setSearch] = useState("");
  const{token,user} = useContext(AppContext);

  // Use Effect
  useEffect(()=>{
       getMovies()
  },[search,user]); 

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
  const getMovies = async() => {
      setIsLoading(true);

      let res = null;

      try {
        if(!token){
           res = await api2.get("/movies")
        } else {
           res = await api.get("/movies", {
          headers: {'Authorization':`Bearer ${token}`}
          }); }

        
        // Extract data
        const payload = res.data;
        const movies = payload.data.movies;


        // Sort Data
        const newArray = movies.filter(movie => movie.title.toLowerCase().trim().startsWith(search) === true);


        setMovies(newArray);
        setIsLoading(false)

      } catch (err) {
        const payload = err.response.data;
        const message = payload.message;

        // navigate to error page
        console.log(message)
        setIsLoading(false)

      };
  }

  const onSearch = (e) => {
    setSearch(e.target.value);
 }

  return (
    <StyledHome>

    <div className="swiper">
         <div className="swiper-wrapper">
              {movies.slice(0,3).map(movie => <div className="swiper-slide" key={movie.id}><Board key={movie.id} movie={movie}/></div>)}
         </div>

         <div className="swiper-pagination"></div>

         <div className="swiper-button-prev"></div>
         <div className="swiper-button-next"></div>

         <div className="swiper-scrollbar"></div>
    </div>

            <div className="title">List Film</div>

            <form onSubmit={(e)=>{e.preventDefault()}}>
                  <input type="text" placeholder='Search your movies' onChange={onSearch} value={search}></input>
             </form>
                
            {isLoading ? <div style={{marginBottom:"100vh"}}>Loading...</div> : movies.length === 0 ? <div style={{marginBottom:"100vh"}}>No results found..</div> : ""}

             <div className='movies'>
                 {movies.map(movie => <MovieCard key={movie.id} movie={movie} navigate={navigate} getMovies={getMovies} token={token}/>)}
             </div>

    </StyledHome>
  )
}

export default Home