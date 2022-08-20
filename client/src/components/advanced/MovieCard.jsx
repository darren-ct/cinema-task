import React from 'react'
import  StyledMovieCard  from '../../core-ui/MovieCard.style'
import liked from "../../assets/liked.png";
import unliked from "../../assets/unliked.png"
import  api  from '../../connection';

const MovieCard = ({movie,navigate,getMovies,token}) => {
  const id = movie.id;

  const setFavorite = async(e) => {
      e.stopPropagation();
      
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

          return getMovies()
      } catch(err) {
        const payload = err.response.data;
        const message = payload.message;

        // navigate to error page
        console.log(err)
        console.log(message)
      }
  };

  return (
    <StyledMovieCard>
          <div onClick={()=>{navigate(`/detail/${id}`)}} style={{position:"relative"}}>
          <img className="movie-img" src={movie.image} />
          <span>{movie.title}</span>
          <p>Rp {movie.price}</p>
          { token &&
           <img onClick={setFavorite} src={movie.isFavorite ? liked : unliked} 
           style={{height:28,width:28,position:"absolute",top:332,right:18}} /> }
          </div> 
    </StyledMovieCard>
  )
}

export default MovieCard
