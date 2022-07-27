import { useState,useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

import StyledProfile from '../core-ui/pages/StyledProfile';
import TransactionCard from "../components/advanced/TransactionCard";
import  api  from '../connection';

import unknown from "../assets/unknown.jpg";
import Button from '../components/basic/Button';

const Profile = () => {
  const{user,token} = useContext(AppContext);
  const navigate = useNavigate();

//   State
  const[transactions,setTransactions] = useState([]);
  const[isLoading,setIsLoading] = useState(false);

  const[profile,setProfile] = useState({
     image : "",
     gender : "",
     phone : "",
     address : "",
     city: "",
     country : ""
  });

  

// useEffect

useEffect(()=>{
   getProfile();

   getTransactions();
},[])


// Function
const getProfile = async() => {
      try {
          const res = await api.get("/profile", {
               headers: {'Authorization':`Bearer ${token}`}
               });

          // Extract data
          const payload = res.data;
          const profile = payload.data;
          setProfile(profile)

      } catch(err) {
          const payload = err.response.data;
          const message = payload.message;

        // navigate to error page
        console.log(message)
      };
};

const getTransactions = async() => {
    setIsLoading(true)

    try {
     const res = await api.get("/transactions", {
          headers: {'Authorization':`Bearer ${token}`}
          });

     // Extract data
     const payload = res.data;
     const transactionsData = payload.data.transactions;

     setTransactions(transactionsData)
     setIsLoading(false)




 } catch(err) {
     const payload = err.response.data;
     const message = payload.message;
     setIsLoading(false)
   // navigate to error page
   console.log(message)
 };
};


 
  return (
    <StyledProfile>
           <div className='left'>

               <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span className='title'>
                         My Profile
                    </span>
                    <Button styling="primary" width="" content="Edit Profile" onPress={()=>{navigate("/editprofile")}}
                    />
                </div>
                

                <div className='profile-details'>
                    <img className="profile-img" src={profile.image? profile.image : unknown}/>
                    <div className='profile-description'>
                         <b>Name</b>
                         <p>{user.name}</p>

                         <b>Email</b>
                         <p>{user.email}</p>

                         <b>Phone</b>
                         <p>{profile.phone? profile.phone : "-"}</p>

                         <b>Gender</b>
                         <p>{profile.gender? profile.gender : "-"}</p>
                         
                         <b> Complete Address</b>
                         <p>{profile.address?  `${profile.address},${profile.city},${profile.country}` : "-"}
                         </p>
                         
                    </div>
                </div>

           </div>


           <div className='right'>
                <span className='title'>
                   My Transaction
                </span>

                <div className='transaction-container'>
                      {isLoading ? <div>This is loading..</div> : "" }
                      <div className='transaction-list'>
                          { transactions ? transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />) : <p>Empty list</p>}
                      </div>
                </div>
           </div>

    </StyledProfile>
  )
}

export default Profile