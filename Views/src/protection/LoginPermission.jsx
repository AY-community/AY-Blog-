import {useNavigate} from "react-router-dom";
import wavyBg from "../assets/wavy.png";
import { Helmet } from "react-helmet-async";



export default function LoginPermission(){
    const navigate = useNavigate()

         return(
        <div className="main">
            <Helmet>
           <title> Login access | AY Blog App</title>
          <meta name="robots" content="noindex, nofollow" />
          </Helmet>
             <section className="middleSection rs-middleSection">
            <h1 className="middleh1">Login permission</h1> 
            <h5 className="middleh5 " >You need to log in to access our app and enjoy its features
</h5>  
    
            <button className="button" onClick={()=>{navigate('/login')}}    ><span className="button-content">Log in</span></button>
             </section>
    
     <div
    style={{ background: `url(${wavyBg})` }}
    className="wavyBg wavyBg-SignUp"
    ></div>
        </div>
         )
    
}