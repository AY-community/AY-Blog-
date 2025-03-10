import {useNavigate} from "react-router-dom";
import wavyBg from "../assets/wavy.png";
import { Helmet } from "react-helmet-async";



export default function LogoutPermission(){
    const navigate = useNavigate()

         return(
        <div className="main">
                         <Helmet>
           <title> Logout required | AY Blog App</title>
          <meta name="robots" content="noindex, nofollow" />
          </Helmet>
             <section className="middleSection rs-middleSection">
            <h1 className="middleh1">Logout required</h1> 
            <h5 className="middleh5 " >You need to log out before accessing this section.</h5>  
    
            <button className="button" onClick={()=>{navigate('/Blogs')}}    ><span className="button-content">Go Back</span></button>
             </section>
    
     <div
    style={{ background: `url(${wavyBg})` }}
    className="wavyBg wavyBg-SignUp"
    ></div>
        </div>
         )
    
}