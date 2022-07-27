import {useNavigate} from "react-router-dom";
import {AppContext} from "../App";
import { useContext,useState } from "react";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../components/basic/Input"
import {  StyledFormBody } from "../core-ui/FormBody.style";
import Button from "../components/basic/Button";
import ErrorModal from "../components/modals/ErrorModal";
import api from "../connection";



const schema = yup .object().shape({
  email : yup.string().email().required("Email is required"),
  password :  yup.string().min(8).required("Password is required")
})



const Login = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(AppContext);
  const {register, handleSubmit,formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const [err,setErr] = useState(null)
  const isShown = err ? true : false;

  

  const submitForm = async(data) => {
     // Post
     try {
      let res = await api.post("/login", data);
  
      const payload = res.data;
      const user = payload.data.user;
      console.log(user)
      setUser(user);
    
    } catch(err){
      const payload = err.response.data;
      const message = payload.message;
      setErr(message)
      // setErrMsg(message);
  }; }

  return (
    <>
    <ErrorModal isShown={isShown} message={err} />
    <StyledFormBody>
         <p className="title">Login</p>
         <form onSubmit={handleSubmit(submitForm)}>
            <Input type="text" placeholder="Enter your email" name="email" register={register} errors={errors} />
            <Input type="password" placeholder="Enter your password" name="password" register={register} errors={errors} />
            <Button styling="primary" width="full" content="Login"/>
         </form>
         <p className="link" onClick={()=>{navigate("/signup")}}>Not yet have account?  Register account here..</p>
    </StyledFormBody>
    </>
  )
}

export default Login