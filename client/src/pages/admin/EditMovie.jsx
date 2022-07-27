import { useContext,useState,useEffect} from "react";

import EditMovieForm from "./EditMovieForm";
import {AppContext} from "../../App";

import StyledFormMovie from "../../core-ui/pages/FormMovie.style.js";
import api from "../../connection"


import ErrorModal from "../../components/modals/ErrorModal";
import { useParams } from "react-router-dom";



const EditMovie = () => {
    const {id} = useParams()
    const{token} = useContext(AppContext);
    
    // State
    const[preset,setPreset] = useState(null);
    const[errMsg,setErrMsg] = useState(null);
    const[categories,setCategories] = useState([]);
    const[originalImg,setOriginalImg] = useState(null);

    // Functions
    const getCategories = async() => {
        try {
    
          const res = await api.get("/categories", {
            headers: {'Authorization':`Bearer ${token}`}
            });
    
          // Extract data
          const payload = res.data;
          const categories = payload.data.categories;
    
          setCategories(categories);
    
        } catch (err) {
          const payload = err.response.data;
          const message = payload.message;
    
          // navigate to error page
          setErrMsg(message)
          
    
        };
    }

    const getMovie = async() => {
          try {
            const res = await api.get(`/movie/${id}` , {
              headers: {'Authorization':`Bearer ${token}`}
              });

            

            const movie = res.data.data.movie

            setPreset(movie);
            setOriginalImg(movie.image)

          } catch(err) {
           
            const payload = err.response.data;
            const message = payload.message;
  
            setErrMsg(message)
          }
    }

      // UseEffect

     useEffect(()=>{
  
     getCategories();
     getMovie()
     
     },[])

  return (
    <>
    <ErrorModal isShown={errMsg ? true : false} message={errMsg}/>
    <StyledFormMovie>
       

        <b>Edit Movie</b>

        {
        preset &&
        <EditMovieForm originalImg={originalImg} setOriginalImg={setOriginalImg} preset={preset} id={id} categories={categories} token={token} setErrMsg={setErrMsg}/>
        }
       
    </StyledFormMovie>
    </>
  )
}

export default EditMovie;