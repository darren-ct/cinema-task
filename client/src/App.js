import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import {useState,useEffect,createContext} from "react";
import {QueryClient,QueryClientProvider} from "react-query";

import io from "socket.io-client";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Chat from "./pages/Chat";

import Details from "./pages/Details";
import Home from "./pages/Home";
import MyFav from "./pages/MyFav";
import MyMovie from "./pages/MyMovie";
import SearchUser from "./pages/SearchUser"

import List from "./pages/admin/List";
import Categories from "./pages/admin/Categories";
import AddCategory from "./pages/admin/AddCategory";
import EditCategory from "./pages/admin/EditCategory";
import Movies from "./pages/admin/Movies";
import AddMovie from "./pages/admin/AddMovie";
import EditMovie from "./pages/admin/EditMovie"


import Header from "./components/basic/Header";
import ChatButton from "./components/basic/ChatButton";

const queryClient = new QueryClient();
export const AppContext = createContext(null);

const socket = io.connect("http://localhost:5000");

function App() {

  const[user,setUser] = useState(null);
  const token = user ? user.token : null;
  const isAdmin = user ? user.isAdmin : null;

  useEffect(()=>{
  //  get token first time
     const userInfo =  JSON.parse(localStorage.getItem("user"));

     if(!userInfo) return;

     setUser(userInfo);
  },[])

  useEffect(()=>{
    if(user){
      // save token to localstorage
      localStorage.setItem("user",JSON.stringify(user));
    }
    },[user])

  return (
    <AppContext.Provider value={{user,setUser,token,isAdmin,socket}}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
           { user ? <Header isAdmin={isAdmin} setUser={setUser}/> : "" }
            <Routes>
            <Route path="/myprofile" element={!token ? <Navigate to="/signup"/> : <Profile/>} />
            <Route path="/editprofile" element={!token ? <Navigate to="/signup"/> : <EditProfile/>} />

            <Route path="/" element={!token ? <Navigate to="/signup"/> : isAdmin ? <Navigate to="/movies"/> : <Home/>  }/>
            <Route path="/detail/:id" element={!token ? <Navigate to="/signup"/> : isAdmin ? <Navigate to="/movies"/> : <Details/>  }/>
            <Route path="/myfavorites" element={!token ? <Navigate to="/signup"/> : isAdmin ? <Navigate to="/movies"/> : <MyFav/>} />
            <Route path="/mymovies" element={!token ? <Navigate to="/signup"/> : isAdmin ? <Navigate to="/movies"/> : <MyMovie/>} />

            <Route path="/login" element={!token ? <Login setUser={setUser}/> : isAdmin ? <Navigate to="/movies"/>: <Navigate to="/"/>}/>
            <Route path="/signup" element={!token ?  <Signup setUser={setUser}/> :  isAdmin ? <Navigate to="/movies"/>:  <Navigate to="/"/>}/>


            <Route path="/transactionstatus" element={!token?  <Navigate to="/signup"/> : !isAdmin? <Navigate to="/"/> : <List/> }/>
            <Route path="/addmovie" element={!token?  <Navigate to="/signup"/> : !isAdmin? <Navigate to="/"/> : <AddMovie/> }/>
            <Route path="/addcategory" element={!token?  <Navigate to="/signup"/> : !isAdmin? <Navigate to="/"/> : <AddCategory/> }/>

            <Route path="/categories" element={!token?  <Navigate to="/signup"/> : !isAdmin? <Navigate to="/"/> : <Categories/> }/> 
            <Route path="/movies" element={!token?  <Navigate to="/signup"/> : !isAdmin? <Navigate to="/"/> : <Movies/> }/>

            <Route path="/editcategory/:id" element={!token?  <Navigate to="/signup"/> : !isAdmin? <Navigate to="/"/> : <EditCategory/> }/>
            <Route path="/editmovie/:id" element={!token?  <Navigate to="/signup"/> : !isAdmin? <Navigate to="/"/> : <EditMovie/> }/>
            
            <Route path="/chat/:id" element={!token? <Navigate to="/signup"/> : <Chat/>}/>
            <Route path="/searchuser" element={!token? <Navigate to="/signup"/> : <SearchUser/>}/>


            {/* <Route path="*" element={<NotFound/>} /> */}
            </Routes>

            
            { user ? <ChatButton />: "" }


    </BrowserRouter>
    </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
