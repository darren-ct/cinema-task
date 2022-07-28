import { useEffect,useState,useContext } from "react";
import {useNavigate} from "react-router-dom";

import {AppContext} from "../../App";
import { StyledTable } from '../../core-ui/Table.style';
import StatusRow from "../../components/advanced/StatusRow";

import ConfirmModal from "../../components/modals/ConfirmModal";


import api from "../../connection";


const List = () => {
    const navigate = useNavigate();
    const{token} = useContext(AppContext);

    const[status,setStatus] = useState([]);
   


    const[isModal,setIsModal] = useState(false);
    const[idToDelete, setIdToDelete] = useState("");

    
    // Use Effect

    useEffect(()=>{
        getRows()
    },[])


    // Function
    const deleteRow = async(id) => {

      try {
        await api.delete(`/transaction/${id}`, {
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

        const res = await api.get("/alltransactions", {
          headers: {'Authorization':`Bearer ${token}`}
          });

        // Extract data
        const payload = res.data;
        const transactions = payload.data;

        
        setStatus(transactions);
       

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
                  <b style={{fontSize:"24px",color:"#CD2E71"}}>List transaction status</b>
              </div>

              <StyledTable>
              <thead>
                   <tr>
                        <th>No</th>
                        <th>User</th>
                        <th>Movie</th>
                        <th>Status</th>
                        <th>Action</th>
                   </tr>
              </thead>

               
              <tbody>
                   {
                    status.map((status,index) => {
                        return <StatusRow key={status.id} status={{...status,index}} setIsModal={setIsModal} setId={setIdToDelete} />
                    })
                   }
             </tbody>

             
                   
              </StyledTable>
              

        </section>
    </>
  )
}

export default List