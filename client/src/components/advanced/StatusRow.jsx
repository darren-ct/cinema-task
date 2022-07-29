import Button from "../basic/Button";

const StatusRow = ({status,setIsModal,setId}) => {
    const id = status.transaction_id;
    const statusColor = status.status === "success" ? "green" : "pending" ? "yellow" : "red";
  
    return (
      <tr className='table-body-rows'>
                          <td>{status.index + 1}</td>
                          <td>{status.username}</td>
                          <td>{status.title}</td>
                          <td style={{color:statusColor}}>{status.status}</td>
                          <td className='btn-group'>
                          <Button styling={"danger"} width={"flex-1"} content={"Delete"} onPress={()=>{setIsModal(true);setId(id)}}/>
                          </td>
      </tr>
    ) 
  }
  
  export default StatusRow