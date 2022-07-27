import { useEffect,useState,useContext } from "react";
import {useNavigate} from "react-router-dom";

import {AppContext} from "../../App";
import { StyledTable } from '../../core-ui/Table.style';
import CategoryRow from "../../components/advanced/CategoryRow";

import ConfirmModal from "../../components/modals/ConfirmModal";


import api from "../../connection";
import Button from "../../components/basic/Button";

const Categories = () => {
    const navigate = useNavigate();
    const{token} = useContext(AppContext);

    const[categories,setCategories] = useState([]);
   


    const[isModal,setIsModal] = useState(false);
    const[idToDelete, setIdToDelete] = useState("");

    
    // Use Effect

    useEffect(()=>{
        getRows()
    },[])


    // Function
    const deleteRow = async(id) => {

      try {
        await api.delete(`/category/${id}`, {
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
        console.log(message)
        
      };

    }


   

  return (
    <>
        <section className='list-product-section' style={{padding:"80px 84px"}}>
              {isModal? <ConfirmModal id={idToDelete} deleteRow={deleteRow} setIsModal={setIsModal}/> : ""}
              
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <b style={{fontSize:"24px",color:"#CD2E71"}}>List category</b>
                  <Button styling={"primary"} width={""} content={"Add Category"} onPress={()=>{navigate(`/addcategory`)}}/>
              </div>

              <StyledTable>
              <thead>
                   <tr>
                        <th>No</th>
                        <th>Category Name</th>
                        <th>Action</th>
                   </tr>
              </thead>

               
              <tbody>
                  { categories &&
                    categories.map((category,index) => {
                        return <CategoryRow key={category.id} category={{...category,index}} navigate={navigate} setIsModal={setIsModal} setId={setIdToDelete} />
                    })
                   }
             </tbody>

             
                   
              </StyledTable>
              

        </section>
    </>
  )
}

export default Categories