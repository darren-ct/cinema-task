import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";

import Button from "../../components/basic/Button";
import Input from "../../components/basic/Input";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import api from "../../connection";



const schema = yup.object().shape({
  name : yup.string().min(3).required("Name is required"),
})


const EditCategoryForm = ({preValues,setErrMsg,id}) => {
    const navigate = useNavigate();
    const{token} = useContext(AppContext);

    const {register, handleSubmit,formState:{errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues : preValues
      });


      const onSubmit = async(data) => {
        
        // Reset
        setErrMsg("")
       
        try {
          const res = await api.put(`/category/${id}`, {
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
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Enter category name" name={"name"} errors={errors} register={register}/>
        <Button styling="primary" width="full" content="Edit Category" />
    </form>
  )
}

export default EditCategoryForm