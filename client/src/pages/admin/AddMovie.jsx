import { useContext,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {AppContext} from "../../App";

import StyledFormMovie from "../../core-ui/pages/FormMovie.style.js";
import Input from "../../components/basic/Input";
import api from "../../connection"


import ErrorModal from "../../components/modals/ErrorModal";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../components/basic/Button";

const schema = yup.object().shape({
  title : yup.string().min(3).required("Title is required"),
  desc : yup.string().min(8).required("Description is required"),
  price : yup.number().min(1).required("Price is required"),
  link : yup.string().min(3).required("Link is required"),
  category : yup.string().min(3).required("Category is required")
})

const AddMovie = () => {
    const{token} = useContext(AppContext);
    const navigate = useNavigate();

    const {register, handleSubmit,formState:{errors}} = useForm({
      resolver: yupResolver(schema)
    });

    // State
    const[originalImg,setOriginalImg] = useState(null);
    const[form,setForm] = useState({image:{value:null}});
    const[errMsg,setErrMsg] = useState("");
    const[categories,setCategories] = useState([]);


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
      formData.append("title",data.title);
      formData.append("desc",data.desc);

      formData.append("price",data.price);
      formData.append("category",data.category);
      formData.append("link",data.link);

        // Reset
        setErrMsg("")
       
        try {
            await api.post(`/movie`, formData , {
            headers: {'Authorization':`Bearer ${token}`}
            });
    
            navigate("/movies");
          } catch (err) {
    
          const payload = err.response.data;
          const message = payload.message;

          setErrMsg(message)
    
          };
    
           
      };

    const getCategories = async() => {
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
          setErrMsg(message)
          
    
        };
      }

      // UseEffect
      useEffect(()=>{
     if(form.image.value && typeof form.image.value !== "string"){
     const image = URL.createObjectURL(form.image.value);
     setOriginalImg(image)
  
     }
     },[form])

     useEffect(()=>{
  
     getCategories();
     
     },[])

  return (
    <>
    <ErrorModal isShown={errMsg ? true : false} message={errMsg}/>
    <StyledFormMovie>
       

        <b>Add Movie</b>
        <form onSubmit={handleSubmit(onSubmit)}>

        <label className="upload-img">
          <div>Upload Image</div>
          <input style={{display:"none"}}type="file" onChange={onSelect} name="image"/>
          <img src={originalImg} style={{width:"64px",marginLeft:"8px"}}/>
        </label>

        <Input type="text" placeholder="Enter movie title" name={"title"} errors={errors} register={register}/>

        <div className="form-control">
                <textarea {...register("desc")} style={errors["desc"] ? {border:"1px solid #FF4C41"} : {}} placeholder="Enter description"></textarea>
                <p>{errors["desc"]?.message}</p>
        </div>

        <Input type="text" placeholder="Enter movie price" name={"price"} errors={errors} register={register}/>
        <Input type="text" placeholder="Enter movie link" name={"link"} errors={errors} register={register}/>

        <label style={{marginRight : "20px",color: "white"}}>Choose category</label>
           <select id="category" {...register("category")} >
                  {categories.map(cat => <option value={cat.name}>{cat.name}</option>)}
        </select>

        <Button styling="primary" width="full" content="Add Movie" />
        </form>
    </StyledFormMovie>
    </>
  )
}

export default AddMovie;