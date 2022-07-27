import { useState } from "react";
import {useNavigate} from "react-router-dom";
import api from "../connection";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../components/basic/Input"
import {  StyledFormBody } from "../core-ui/FormBody.style";
import Button from "../components/basic/Button";
import ErrorModal from "../components/modals/ErrorModal";

import {AppContext} from "../App";
import { useContext } from "react";

const schema = yup .object().shape({
  email : yup.string().email().required("Email is required"),
  name : yup.string().min(3).required("Username is required"),
  password :  yup.string().min(8).required("Password is required"),
  reenter : yup.string().oneOf([yup.ref("password"),"lol"])
})



const Signup = () => {

  const {setUser} = useContext(AppContext);
  const navigate = useNavigate();


  const {register, handleSubmit,formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });
  const [err,setErr] = useState(null)

  const isShown = err ? true : false;

  

  const submitForm = async(data) => {
    setErr(null);

    // Post
    try {
     let res = await api.post("/register", data);
 
     const payload = res.data;
     const user = payload.data.user;
     
     setUser(user);
   
   } catch(err){
     const payload = err.response.data;
     const message = payload.message;
     
     setErr(message);
 }; }

  return (
    <>
    <ErrorModal isShown={isShown} message={err} />
    <StyledFormBody>
         <p className="title">Register</p>
         <form onSubmit={handleSubmit(submitForm)}>
            <Input type="text" placeholder="Enter your username" name="name" register={register} errors={errors} />
            <Input type="text" placeholder="Enter your email" name="email" register={register} errors={errors} />
            <Input type="password" placeholder="Enter your password" name="password" register={register} errors={errors} />
            <Input type="password" placeholder="Reenter your password" name="reenter" register={register} errors={errors} />
            <Button styling="primary" width="full" content="Signup"/>
         </form>
         <p className="link" onClick={()=>{navigate("/login")}}>Already have account? Login here..</p>
    </StyledFormBody>
    </>
  )
}

export default Signup