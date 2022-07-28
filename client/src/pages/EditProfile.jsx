import { useContext,useState,useEffect} from "react";

import EditProfileForm from "./EditProfileForm";
import {AppContext} from "../App";

import StyledFormProfile from "../core-ui/pages/FormProfile.style"
import api from "../connection"


import ErrorModal from "../components/modals/ErrorModal";
import { useParams } from "react-router-dom";



const EditProfile = () => {
    const {id} = useParams()
    const{token} = useContext(AppContext);
    
    // State
    const[preset,setPreset] = useState(null);
    const[errMsg,setErrMsg] = useState(null);
    const[originalImg,setOriginalImg] = useState(null);

    // Functions
   
    const getProfile = async() => {
          try {
            const res = await api.get(`/profile` , {
              headers: {'Authorization':`Bearer ${token}`}
              });

            

            const profile = res.data.data

            setPreset(profile);
            setOriginalImg(profile.image)

          } catch(err) {
           
            const payload = err.response.data;
            const message = payload.message;
  
            setErrMsg(message)
          }
    }

      // UseEffect

     useEffect(()=>{
  

     getProfile()
     
     },[])

  return (
    <>
    <ErrorModal isShown={errMsg ? true : false} message={errMsg}/>
    <StyledFormProfile>
       

        <b>Edit Profile</b>

        {
        preset &&
        <EditProfileForm originalImg={originalImg} setOriginalImg={setOriginalImg} preset={preset} id={id} token={token} setErrMsg={setErrMsg}/>
        }
       
    </StyledFormProfile>
    </>
  )
}

export default EditProfile;