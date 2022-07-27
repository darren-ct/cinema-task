import Button from "../basic/Button";

const MovieRow = ({movie,navigate,setIsModal,setId}) => {
    const id = movie.id;
  
    return (
      <tr className='table-body-rows'>
                          <td>{movie.index + 1}</td>
                          <td><img src = {movie.image} style={{width:"40px"}}/></td>
                          <td>{movie.title}</td>
                          <td>{movie.desc}</td>
                          <td>{movie.price}</td>
                          <td>{movie.link}</td>
                          <td className='btn-group'>
                          <Button styling={"save"} width={"flex-1"} content={"Edit"} onPress={()=>{navigate(`/editmovie/${id}`)}}/>
                          <Button styling={"danger"} width={"flex-1"} content={"Delete"} onPress={()=>{setIsModal(true);setId(id)}}/>
                              
                          </td>
      </tr>
    ) 
  }
  
  export default MovieRow