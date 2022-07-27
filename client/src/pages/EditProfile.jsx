import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../App";


import StyledFormProfile from '../core-ui/page/FormProfile.style'
import Input from "../components/Input";

import {api} from "../connection";
import { pushError } from "../auth";

import unknown from "../assets/unknown.jpg";
import Alert from "../components/Alert";

const EditProfile = () => {
  const {token} = useContext(AppContext);
  const navigate = useNavigate();
  
//  State
  const[form,setForm] = useState(
    {
      image : {
        value : "" , errMsg: ""
      },
      phone : {
       value : "" , errMsg: ""
      },
      gender : {
        value : "" , errMsg: ""
      },
      country : {
        value : "" , errMsg: ""
      },
      city : {
        value : "" , errMsg: ""
      },
      address : {
        value : "" , errMsg: ""
      },
    }
  )
  const[errMsg,setErrMsg]= useState("");
  const[originalImg,setOriginalImg] = useState(null);

// Use Effects
useEffect(()=>{
  if(form.image.value && typeof form.image.value !== "string"){
  const image = URL.createObjectURL(form.image.value);
  setOriginalImg(image)
  
}
},[form])

 useEffect(()=>{
    getInputs();
 },[])
 
// Functions

  const onSelect = (e) => {
    setForm(prev => {
      return {
        ...prev,
        image : {
          value : e.target.files[0] ,
          errMsg : "" }
      }
     })
  }

  const getInputs = async () => {
    try {
      const res = await api.get(`/profile`, {
        headers: {'Authorization':`Bearer ${token}`}
        });

        // Extract data
      const payload = res.data;
      const profile = payload.data;

      setForm( {
        image : {
         value :  "", errMsg: ""
        },
        gender : {
          value : profile.gender ? profile.gender : "" , errMsg: ""
        },
        phone : {
          value : profile.phone ? profile.phone : "" , errMsg: ""
        },
        country : {
          value : profile.country ? profile.country : "" , errMsg: ""
        },
        city : {
          value : profile.city ? profile.city : "" , errMsg: ""
        },
        address : {
            value : profile.address ? profile.address : "" , errMsg: ""
          },
      });

      setOriginalImg(profile.image)



      } catch (err) {

      
      const payload = err.response.data;
      const message = payload.message;

      // navigate to error page
      console.log(message)
      

      };
  };

  const onSubmit = async(e) => {
    e.preventDefault();

            // Reset
            setErrMsg("")

            // Filter
            if(!form.image.value.type ){
                return setErrMsg("Please select file and a different one")
            };
        
            if(form.image.value.type.slice(0,5) !== "image"){
              return setErrMsg("File must be image type");
            }
// FormData
    const formData = new FormData();

    formData.append("image",form.image.value);
    formData.append("gender",form.gender.value);
    formData.append("phone",form.phone.value);
    formData.append("country",form.country.value);
    formData.append("city",form.city.value);
    formData.append("address",form.address.value);


    try {
      await api.put(`/profile`, formData , {
        headers: {'Authorization':`Bearer ${token}`}
        });

        
        navigate("/myprofile");


      } catch (err) {
      const payload = err.response.data;
      const message = payload.message;

      // navigate to error page
      setErrMsg(message)
      };

    
}

  

  return (
    <StyledFormProfile>
    {errMsg && <Alert message={errMsg}/>}
         <b>Edit Product</b>
      <label className="upload-img">
          <div>Upload Image</div>
          <input style={{display:"none"}} type="file" onChange={onSelect} name="image"/>
          <img src={originalImg? originalImg : unknown} style={{width:"64px",marginLeft:"8px"}}/>
      </label>
      <form>
           <Input type="input" placeholder="phone" value={form.phone.value} err={form.phone.errMsg} setForm={setForm}/>
           <Input type="input" placeholder="gender" value={form.gender.value} err={form.gender.errMsg} setForm={setForm}/>
           <Input type="input" placeholder="country" value={form.country.value} err={form.country.errMsg} setForm={setForm}/>
           <Input type="input" placeholder="city" value={form.city.value} err={form.city.errMsg} setForm={setForm}/>
           <Input type="input" placeholder="address" value={form.address.value} err={form.address.errMsg} setForm={setForm}/>
           <button onClick={onSubmit}>Save</button>
      </form>
    </StyledFormProfile>
  )
}

export default EditProfile;