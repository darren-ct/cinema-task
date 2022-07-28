import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../components/basic/Button";

import Input from "../components/basic/Input";
import api from "../connection"

const schema = yup.object().shape({
  gender : yup.string().min(3).required("gender is required"),
  phone : yup.string().min(8).required("Phone is required"),
  country : yup.string().min(3).required("Country is required"),
  city : yup.string().min(3).required("City is required"),
  address : yup.string().min(3).required("Address is required")
})

const EditProfileForm = ({originalImg,setOriginalImg,token,preset,setErrMsg,id}) => {
  
    const {register, handleSubmit,formState:{errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: preset
      });

    const navigate = useNavigate();
   
    const[form,setForm] = useState({image:{value:null}});

    // Effect
    useEffect(()=>{
        if(form.image.value && typeof form.image.value !== "string"){
        const image = URL.createObjectURL(form.image.value);
        setOriginalImg(image)
     
        }
    },[form])

    // Functions
    const onSelect = (e) => {
        setForm(prev => {
          return {
            ...prev,
            image : {
              value : e.target.files[0]
          }
         }})
      }

    const onSubmit = async(data) => {
        const formData = new FormData();
  
        formData.append("image",form.image.value);
        formData.append("gender",data.gender);
        formData.append("phone",data.phone);
  
        formData.append("country",data.country);
        formData.append("city",data.city);
        formData.append("address",data.address);
  
          // Reset
          setErrMsg("")
         
          try {
              await api.put(`/profile`, formData , {
              headers: {'Authorization':`Bearer ${token}`}
              });
      
              navigate("/myprofile");
            } catch (err) {
      
            const payload = err.response.data;
            const message = payload.message;
  
            setErrMsg(message)
      
            };
      
             
    };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

    <label className="upload-img">
      <div>Upload Image</div>
      <input style={{display:"none"}}type="file" onChange={onSelect} name="image"/>
      <img src={originalImg} style={{width:"64px",marginLeft:"8px"}}/>
    </label>

    <Input type="text" placeholder="Enter gender" name={"gender"} errors={errors} register={register}/>
    <Input type="text" placeholder="Enter phone number" name={"phone"} errors={errors} register={register}/>
    <Input type="text" placeholder="Enter country" name={"country"} errors={errors} register={register}/>
    <Input type="text" placeholder="Enter city" name={"city"} errors={errors} register={register}/>
    <Input type="text" placeholder="Enter address" name={"address"} errors={errors} register={register}/>

    

    <Button styling="primary" width="full" content="Edit Profile" />
    </form>
  )
}

export default EditProfileForm