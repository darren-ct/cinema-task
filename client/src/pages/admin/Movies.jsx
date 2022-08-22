import { useEffect,useState,useContext } from "react";
import {useNavigate} from "react-router-dom";

import {AppContext} from "../../App";
import { StyledTable } from '../../core-ui/Table.style';
import MovieRow from "../../components/advanced/MovieRow";

import ConfirmModal from "../../components/modals/ConfirmModal";


import api from "../../connection";
import Button from "../../components/basic/Button";

import convertRupiah from 'rupiah-format';

const Movies = () => {
    const navigate = useNavigate();
    const{token} = useContext(AppContext);

    const[movies,setMovies] = useState([]);
   
    const[isModal,setIsModal] = useState(false);
    const[idToDelete, setIdToDelete] = useState("");

    
    // Use Effect
    useEffect(()=>{
        getRows()
    },[])


    // Function
    const deleteRow = async(id) => {

      try {
        await api.delete(`/movie/${id}`, {
                       headers: {'Authorization':`Bearer ${token}`}
                       }); 

         getRows();


      } catch(err) {
        const payload = err.response.data;
        const message = payload.message;

        // navigate to error page
        console.log(message)
       
      };


    };

    const getRows = async() => {
        
      

      try {

        const res = await api.get("/movies", {
          headers: {'Authorization':`Bearer ${token}`}
          });

        // Extract data
        const payload = res.data;
        let movies = payload.data.movies;
        
        movies = movies.map(movie => {
          return {...movie,price:convertRupiah.convert(movie.price)}
        })

        setMovies(movies);
       

      } catch (err) {
        const payload = err.response.data;
        const message = payload.message;

        // navigate to error page
        console.log(message)
        
      };

    }


   

  return (
    <>
        <section className='list-product-section' style={{padding:"80px 84px"}}>
              {isModal? <ConfirmModal id={idToDelete} deleteRow={deleteRow} setIsModal={setIsModal}/> : ""}
              
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <b style={{fontSize:"24px",color:"#CD2E71"}}>List movie</b>
                  <Button styling={"primary"} width={""} content={"Add Movie"} onPress={()=>{navigate(`/addmovie`)}}/>
              </div>

              <StyledTable>
              <thead>
                   <tr>
                        <th>No</th>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Link</th>
                        <th>Action</th>
                   </tr>
              </thead>

               
              <tbody>
                   {
                    movies.map((movie,index) => {
                        return <MovieRow key={movie.id} movie={{...movie,index}} navigate={navigate} setIsModal={setIsModal} setId={setIdToDelete} />
                    })
                   }
             </tbody>

             
                   
              </StyledTable>
              

        </section>
    </>
  )
}

export default Movies
