import Button from "../basic/Button";

const StatusRow = ({status,navigate,setIsModal,setId}) => {
    const id = status.id;
  
    return (
      <tr className='table-body-rows'>
                          <td>{status.index + 1}</td>
                          <td>{status.user}</td>
                          <td>{status.movie}</td>
                          <td>{status.price}</td>
                          <td className='btn-group'>
                          <Button styling={"danger"} width={"flex-1"} content={"Delete"} onPress={()=>{setIsModal(true);setId(id)}}/>
                          </td>
      </tr>
    ) 
  }
  
  export default StatusRow