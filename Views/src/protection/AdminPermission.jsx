import {useNavigate} from "react-router-dom";
import wavyBg from "../assets/wavy.png";
import { Helmet } from "react-helmet-async";



export default function adminPermission(){
    const navigate = useNavigate()

         return(
        <div className="main">
             <Helmet>
           <title> Admin access | AY Blog App</title>
          <meta name="robots" content="noindex, nofollow" />
          </Helmet>
             <section className="middleSection rs-middleSection">
            <h1 className="middleh1">Admin permission</h1> 
            <h5 className="middleh5 " >You need an admin access to use the admin panel to add and delete posts
</h5>  
    
            <button className="button" onClick={()=>{navigate("/")}}    ><span className="button-content">Go Home</span></button>
             </section>
    
     <div
    style={{ background: `url(${wavyBg})` }}
    className="wavyBg wavyBg-SignUp"
    ></div>
        </div>
         )
    
}