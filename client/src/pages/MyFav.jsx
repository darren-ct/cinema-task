import { useState,useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import  api  from '../connection';
import StyledFavorites from '../core-ui/pages/Favorites.style'
import MovieCard from '../components/advanced/MovieCard';


const MyFav = () => {
  const navigate = useNavigate();
  const{token} = useContext(AppContext);
  const[favorites,setFavorites] = useState([]);

  useEffect(()=>{
       getFavorites()
  },[]);


  const getFavorites = async() => {
    try {

        const res = await api.get("/favorites", {
          headers: {'Authorization':`Bearer ${token}`}
          });

        
        // Extract data
        const payload = res.data;
        const favorites = payload.data.favorites;



        setFavorites(favorites);
       

      } catch (err) {
        const payload = err.response.data;
        const message = payload.message;

        // navigate to error page
        console.log(message)
        

      };
  }

  return (
    <StyledFavorites>
        <div className='title'>My Favorites</div>
        {favorites.length === 0 && <p style={{width:"100%",textAlign:"center",fontWeight:"bold",marginTop:"48px",fontSize: "16px"}}>You have no favorites..Add favorites at homepage</p>}
        <div className='favorites'>
                 {favorites.map(favorite => <MovieCard key={favorite.id} movie={favorite} navigate={navigate} getMovies={getFavorites} token={token}/>)}
        </div>
    </StyledFavorites>
  )
}

export default MyFav  