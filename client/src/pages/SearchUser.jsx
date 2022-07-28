import {useState,useContext} from "react"
import {useNavigate} from "react-router-dom";

import StyledSearchUser from "../core-ui/pages/SearchUser.style"
import UserCard from "../components/advanced/UserCard";
import Input from "../components/basic/Input"
import Button from "../components/basic/Button";

import api from "../connection";
import { AppContext } from "../App";
import ErrorModal from "../components/modals/ErrorModal";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    search : yup.string().required("Cannot be empty"),
  })


const SearchUser = () => {
    const { token } = useContext(AppContext);
    const navigate = useNavigate();

    const {register, handleSubmit,formState:{errors}} = useForm({
        resolver: yupResolver(schema)
      });

    // States
    const[userList,setUserList] = useState([]);
    const[errMsg,setErrMsg] = useState("")

    // Function
    const getUsers = async(data) => {


        try {
           const res = await api.get("/users",{
            headers: {'Authorization':`Bearer ${token}`}
           });

           const payload = res.data;
           const users = payload.data.users;

          // Sortdata

           const filteredUsers = users.filter(user => user.username.toLowerCase().trim().startsWith(data.search) === true)

          setUserList(filteredUsers);

          

        } catch(err) {

            const payload = err.response.data;
            const message = payload.message;

            // navigate to error page
            console.log(message)

        };
    };

    const submitForm = (data) => {
    
    setErrMsg("")

    getUsers(data);

    };

  return (
    <StyledSearchUser>
         {errMsg && <ErrorModal isShown={errMsg ? true : false} message={errMsg}/>}
         <form onSubmit={handleSubmit(submitForm)}>
              <Input type="text" placeholder="search" name="search" errors={errors} register={register}/>
              <Button content="Search User" styling="primary" width="full"/>
         </form>

         <div className="user-container">
               <div className="user-list">
                    {userList.length === 0 ? <div style={{textAlign:"center",fontSize:"24px"}}>No user found..</div> 
                    : userList.map(user => <UserCard key={user.user_id} user={user} navigate={navigate} api={api} token={token}/>)
                    }
                    
               </div>
         </div>
    </StyledSearchUser>
  )
}

export default SearchUser