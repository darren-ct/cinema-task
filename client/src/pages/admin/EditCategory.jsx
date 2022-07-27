import { useContext,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import {AppContext} from "../../App";

import StyledFormCategory from "../../core-ui/pages/FormCategory.style.js";
import EditCategoryForm from "./EditCategoryForm"
import api from "../../connection"


import ErrorModal from "../../components/modals/ErrorModal";




const EditCategory = () => {
    const {id} = useParams();
    const{token} = useContext(AppContext);

    const[preValues,setpreValues] = useState()
   

    // State

    const[errMsg,setErrMsg] = useState("")

      // Use Effects
  useEffect(()=>{
   
    getInputs();
  
    },[]);
  
    // Functions
    const getInputs = async () => {
      try {
        const res = await api.get(`/category/${id}`, {
          headers: {'Authorization':`Bearer ${token}`}
          });
  
          // Extract data
        const payload = res.data;
        const name = payload.data.category.name;
  
   
        setpreValues({name:name})
  
        } catch (err) {
  
        
        const payload = err.response.data;
        const message = payload.message;
  
        // navigate to error page
        setErrMsg(message)
        
        };
    };
    

  return (
    <>
    <ErrorModal isShown={errMsg ? true : false} message={errMsg}/>
    <StyledFormCategory>
       

        <b>Edit Category</b>
      {  preValues ? <EditCategoryForm preValues={preValues} setErrMsg={setErrMsg}/> : <div>Loading...</div> }
        
    </StyledFormCategory>
    </>
  )
}

export default EditCategory;