import wavyBg from "../assets/wavy.png";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect ,  } from "react";
import {useParams , useNavigate} from "react-router-dom"
import { Helmet } from "react-helmet-async";


export default function Reset(){
    const [passwordType, setPasswordType] = useState("password");
    const [passError , setpassError] = useState("")
    const { resetToken } = useParams();
    const navigate = useNavigate();
    const [btnAnimationOut, setBtnAnimationOut] = useState({});
    const [h1AnimationOut, setH1AnimationOut] = useState({});
    const [h5AnimationOut, setH5AnimationOut] = useState({});


    function delayClick() {
      setBtnAnimationOut({ animation: "fadeOutDown  0.5s forwards " });
      setH1AnimationOut({ animation: "fadeOutDown 1.5s forwards " });
      setH5AnimationOut({ animation: "fadeOutDown 1.5s forwards " });
      }

    function eyeToggle() {
      setPasswordType(passwordType === "password" ? "text" : "password");
    }
  
    async function postResetFetch(e) {
      e.preventDefault();
      setpassError("")
      const password = new FormData(e.target).get("password")
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Reset/${resetToken}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
      })
  
      const data =  await response.json()
  
      if(!response.ok){
        setpassError(data.error)
      }
      else{
        delayClick()
        setTimeout(()=>{
        navigate("/login")} , 500)
   }
  
      
      }catch(err){console.log(err)} }


      useEffect(( )=>{
        async function checkUserOut(){
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Reset/:resetToken`  , {method:"GET" , credentials:"include"})
          const data = await response.json()

         if(response.status === 403){
             navigate("/LogoutPermission")
              
       }
      }
      checkUserOut();
      } , [])
    

      return(
    <div className="main">
           <Helmet>
           <title>Reset Your Password | AY Blog App</title>
        <meta name="robots" content="noindex, nofollow" />
          </Helmet>
    <section className="middleSection rs-middleSection">
        <h1 className="middleh1" style={h1AnimationOut}>Reset Your Password</h1> 
        <h5 className="middleh5" style={h5AnimationOut}>{!passError ? ("Add a strong and secure password between 6 and 18 characters, ideally using 2 or 3 words for better security") : (
    <span style={{ color: "darkred" }}>{passError}</span>
  )}
</h5>
        <form method="POST" className="addForm" style={btnAnimationOut}  onSubmit={postResetFetch}>

        <div className="input animatedInput">
        <input className="SearchInput" type={passwordType} name="password" placeholder="Enter your password"  autoComplete="new-password" maxLength="18" />
        <span className="eyeToggle eyeToggleAdd" onClick={eyeToggle}>
              {passwordType === "password" ? <Eye /> : <EyeOff />}
            </span>
        </div>
        
        <button className="button"  ><span className="button-content">Reset</span></button>
        </form> 
         </section>


    <div
    style={{ background: `url(${wavyBg})` }}
     className="wavyBg wavyBg-SignUp"
    ></div>
    </div>
      )

}
