import wavyBg from "../assets/wavy.png";
import "./SignUp.css";
import logo from "/logo.png";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import fullLogo from "../../public/fullLogo.png";
import { Helmet } from "react-helmet-async";



export default function SignUp() {
  const navigate = useNavigate();
  const [FormAnimationOut, setFormAnimationOut] = useState({});
  const [errors, setErrors] = useState({}); 


  useEffect(( )=>{
  async function checkUserOut(){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/SignUp`  , {method:"GET" , credentials:"include"})
    const data = await response.json()

   if(response.status === 403){

       navigate("/LogoutPermission")
        
 }
}
checkUserOut();
} , [])

  
  async function SignUpFetch(e){
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData)

   try{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/SignUp` , {
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(data),
      }
    );

    const errorData =await response.json();

    if (!response.ok) {
      setErrors(errorData.error || {}); 
    } 
    else{
      navigate("/emailwaiting")

    }
    
  } catch (err) {
    console.error("Network error:", err);
  }}
    
 


  function delayClick(e) {
    e.preventDefault();

    //FADEOUT ANIMATION BEFORE NAVIGATION

    setFormAnimationOut({ animation: "fadeOutDown 0.5s forwards " });

    //DELAY THE NAVIGATION

    setTimeout(() => {
      navigate("/Login");
    }, 500);
  }

  return (
    <div className="main">
      <Helmet>
  <title>Sign Up | AY Blog</title>
  <meta name="description" content="Create an account on AY Blog to explore the latest web development insights, tutorials, and tech trends." />
  <meta name="keywords" content="signup, register, AY Blog, web development, coding tutorials, programming, tech community, developer news" />
  <meta property="og:title" content="Join AY Blog Today" />
  <meta property="og:description" content="Sign up to access exclusive web development insights, tutorials, and a community of developers." />
  <meta property="og:image" content={fullLogo} />
  <meta property="og:type" content="website" />
     </Helmet>

      <form method="POST" className="userForm" style={FormAnimationOut}  onSubmit={SignUpFetch}>
        <div className="formHeader">
          <img src={logo} alt="logo" width="15%" />
          <h1>Sign Up</h1>
          <h6>
            already have an account? <span onClick={delayClick}> Log in</span>
          </h6>
        </div>

        <button className="socialmediaButton" onClick={() => window.location.href=`${import.meta.env.VITE_BACKEND_URL}/auth/facebook`} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="26"
            height="26"
            viewBox="0 0 48 48"
          >
            <path
              fill="#039be5"
              d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
            ></path>
            <path
              fill="#fff"
              d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
            ></path>
          </svg>
          Sign Up with Facebook
        </button>
        <button className="socialmediaButton" onClick={() => window.location.href=`${import.meta.env.VITE_BACKEND_URL}/auth/google`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="22"
            height="22"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Sign Up with Google
        </button>

        <h5>Enter your email adress to create an account</h5>

        <div className="inputDiv">
          <label htmlFor="username"> <span>Your username </span><span>{errors.userName}</span></label>
          <div className="input">
            <input type="text" name="userName" maxLength="20" />
          </div>
        </div>

        <div className="inputDiv">
          <label htmlFor="email"> <span>Your email</span> <span>{errors.email}</span></label>
          <div className="input">
            <input type="email" name="email" />
          </div>
        </div>
        <button className="button">
          <span className="button-content">Sign Up</span>
        </button>
      </form>
      <div
        style={{ background: `url(${wavyBg})` }}
        className="wavyBg wavyBg-SignUp"
      ></div>
    </div>
  );
}
