import { useState,useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import  api  from '../connection';
import StyledMyMovies from '../core-ui/pages/MyMovies.style'
import MovieCard from '../components/advanced/MovieCard';


const MyMovie = () => {
  const navigate = useNavigate();
  const{token} = useContext(AppContext);
  const[movies,setMovies] = useState([]);

  useEffect(()=>{
       getMyMovies()
  },[]);


  const getMyMovies = async() => {
    try {

        const res = await api.get("/mymovies", {
          headers: {'Authorization':`Bearer ${token}`}
          });

        
        // Extract data
        const payload = res.data;
        const movies = payload.data.mymovies;



        setMovies(movies);
       

      } catch (err) {
        const payload = err.response.data;
        const message = payload.message;

        // navigate to error page
        console.log(message)
        

      };
  }

  return (
    <StyledMyMovies>
        <div className='title'>My Movies</div>
        {movies.length === 0 && <p style={{width:"100%",textAlign:"center",fontWeight:"bold",marginTop:"48px",fontSize: "16px"}}>You have no movies..Purchase movies</p>}
        <div className='mymovies'>
                 {movies.map(movie => <MovieCard key={movie.id} movie={movie} navigate={navigate} getMovies={getMyMovies} token={token}/>)}
        </div>
    </StyledMyMovies>
  )
}

export default MyMovie
