import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";import Home from './Home/Home'
import SignUp from './SignUp/SignUp'
import Login from './Login/Login'
import Admin from './Admin/Admin'
import DeletePost from './Admin/Deletepost'
import Blogs from './Blogs/Blogs'
import Add from './Password/Add'
import  Verify  from './Password/verify'
import Reset from './Password/Reset'
import Reviews from './Blogs/reviews'
import ResetSearch from './Password/ResetSearch'
import NotFound from './404NotFound/NotFound'
import Wait from './Password/emailwait'
import OTP from './Password/OTP'
import LoginPermission from './protection/LoginPermission';
import LogoutPermission from './protection/LogoutPermission';
import AdminPermission from './protection/adminPermission' ;


const BackgroundChanger = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/Blogs") {
      document.body.style.backgroundColor = "white";
    } else {
      document.body.style.backgroundColor = ""; // Reset to default
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default  function App() {

  return(
    <Router>
    <BackgroundChanger />
    <Routes>
      <Route path="/" element={<Home />} />   
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/DeletePost" element={<DeletePost />} />//
      <Route path="/Blogs" element={<Blogs />} />
      <Route path="/Reviews" element={<Reviews />} /> //
      <Route path="/AddPassword/:token" element={<Add/>} />//
      <Route path="/verify/:token" element={<Verify />} />
      <Route path="/ResetPassword/:resetToken" element={<Reset/>} />//
      <Route path="/emailwaiting" element={<Wait/>}/> //
      <Route path="/OTP" element={<OTP/>}/> //
      <Route path="/ResetSearchPassword" element={<ResetSearch/>} />
      <Route path="/LoginPermission" element={<LoginPermission/>} />//
      <Route path="/LogoutPermission" element={<LogoutPermission/>} />//
      <Route path="/AdminPermission" element={<AdminPermission/>} />//
      <Route  path="*" element={<NotFound/>}/> //
</Routes>
</Router>
)
 
}


