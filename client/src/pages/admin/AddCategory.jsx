import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import {AppContext} from "../../App";

import StyledFormCategory from "../../core-ui/pages/FormCategory.style.js";
import Input from "../../components/basic/Input";
import api from "../../connection"


import ErrorModal from "../../components/modals/ErrorModal";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../components/basic/Button";

const schema = yup.object().shape({
  name : yup.string().min(3).required("Name is required"),
})

const AddCategory = () => {
    const{token} = useContext(AppContext);
    const navigate = useNavigate();
    const {register, handleSubmit,formState:{errors}} = useForm({
      resolver: yupResolver(schema)
    });

    // State

    const[errMsg,setErrMsg] = useState("")

    // Functions
    const onSubmit = async(data) => {
        
        // Reset
        setErrMsg("")
       
        try {
          const res = await api.post(`/category`, {
            "name" : data.name
          }, {
            headers: {'Authorization':`Bearer ${token}`}
            });
    
            navigate("/categories");
          } catch (err) {
    
          const payload = err.response.data;
          const message = payload.message;

          setErrMsg(message)
    
          };
    
           
      };

  return (
    <>
    <ErrorModal isShown={errMsg ? true : false} message={errMsg}/>
    <StyledFormCategory>
       

        <b>Add Category</b>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Enter category name" name={"name"} errors={errors} register={register}/>
        <Button styling="primary" width="full" content="Add Category" />
        </form>
    </StyledFormCategory>
    </>
  )
}

export default AddCategory;