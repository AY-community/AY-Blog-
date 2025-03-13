import wavyBg from "../assets/wavy.png";
import"./password.css"
import {useState , useEffect} from "react"
import {useNavigate} from "react-router-dom"
import { Helmet } from "react-helmet-async";


export default function ResetSearch(){
     const[Error , setError] = useState("")
     const navigate = useNavigate()

     async function OtpFetch(e){
          
     e.preventDefault();
      try{
          const OTP = new FormData(e.target).get("OTP")

          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/OTP` ,  {
                 method: "POST",
                headers: {
                 "Content-Type": "application/json",
                    },
               body: JSON.stringify({ OTP }),
                }
          )

          const data = await response.json()

          if(!response.ok){
               setError(data.message)
          }
          else{

               navigate(`/ResetPassword/${data.token}`)
          }
          
       } catch(err){console.error(err)}
      }

        useEffect(( )=>{
          async function checkUserOut(){
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/OTP`  , {method:"GET" , credentials:"include"})
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
           <title> OTP | AY Blog App</title>
          <meta name="robots" content="noindex, nofollow" />
          </Helmet>
         <section className="middleSection rs-middleSection">
        <h1 className="middleh1">Enter your OTP code</h1> 
        <h5 className="middleh5 rs-middleh5" >{!Error? "enter the code with 6 randome characters including letters and numbers, that have been sent to your email" : <span style={{color:"darkred"}}>{Error}</span>}
        </h5>
        <form method="POST" className="addForm" onSubmit={OtpFetch}>
        <div className="input">
        <input className="SearchInput" type="text" placeholder="Enter your OTP..." name="OTP" maxLength="6" />
        </div>
        <button className="button "><span className="button-content">Verify</span></button>
        </form>

         </section>
 <div
style={{ background: `url(${wavyBg})` }}
className="wavyBg wavyBg-SignUp"
>
</div>
</div>
 )

    
}
