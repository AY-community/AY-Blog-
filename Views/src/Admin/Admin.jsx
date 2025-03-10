import "./Admin.css";
import wavyBg from "../assets/wavy.png";
import logo from "../../public/logo.png";
import uploadImage from "../assets/upload-icon.png"
import { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


export default function Login() {
  const navigate = useNavigate();
  const [FormAnimationOut, setFormAnimationOut] = useState({});
  const[Error , setError] = useState({ title: "", discription: ""  , picture: ""})
  //LOGIN FETCH FUNCTION
  async function handleAdding(e) {
    e.preventDefault();
    setError({}); // Clear previous errors
    const formData = new FormData(e.target)

     try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/adminAdd`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
   

        if (!response.ok) {
          return setError({
            title: data.title || "",
            description: data.description || "",
            picture: data.picture || "",
            category: data.category|| "",
          });
        }
        else if (response.ok) {
          navigate("/Blogs");

        }
    
    
      } catch (err) {
      return setError({
        message:" something went wrong",
      });
    }
  }

  async function handleGetting(){
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/adminAdd` ,  {
        method: "GET",
        credentials: "include" })
      
        
      if(response.status === 403){
        navigate("/adminPermission")
      }

    }catch(err){console.log(err)}
  }

  useEffect(() => {handleGetting()})


  // FADEOUT ANIMATION BEFORE NAVIGATE

  function delayClick(e) {
    e.preventDefault();

    //FADEOUT ANIMATION

    setFormAnimationOut({ animation: "fadeOutDown 0.5s forwards " });

    //DELAY THE NAVIGATION

    setTimeout(() => {
      navigate("/DeletePost");
    }, 500);
  }



  return (
    <div className="main">
                  <Helmet>
           <title>Add a post | AY Blog App</title>
           <meta name="robots" content="noindex, nofollow" />
                 </Helmet>
      <form className="userForm" style={FormAnimationOut} onSubmit={handleAdding}>
        <div className="formHeader">
          <img src={logo} alt="logo" width="15%" />
          <h1>Add Post</h1>

        </div>



        <div className="inputDiv">
        <label htmlFor="title"> <span>Post title</span> <span>{Error.title}</span></label>
        <div className="input " >
            <input type="text" name="title"  maxLength="50" />
          </div>
        </div>

        <div className="inputDiv">
        <label htmlFor="category"> <span>post category</span> <span>{Error.category}</span></label>
        <div className="input " >
            <input type="text" name="category"  maxLength="50" />
          </div>
        </div>

        <div className="  inputDiv addDescription  " >
          <label htmlFor="description"><span>post description</span> <span>{Error.description}</span></label>
          <div className=" input " >
          <textarea name="description" maxLength="1000"></textarea>

          </div>
        </div>

        <div className="inputDiv addPicture" >
          <label htmlFor="password"><span>post picture</span> <span>{Error.picture}</span></label>
          <div className="input"     style={{ 
         background: `url(${uploadImage}) no-repeat`, 
        backgroundColor: 'rgb(251, 251, 251)', 
         backgroundSize: '15%', 
         backgroundPosition: '50% 10%'
    }} >
          <input type="file" name="picture" />
            

          </div>
        </div>


        <div className="formFooter">
          <Link className="link" to="/deletepost">
           delete a post?
          </Link>{" "}
        </div>
        <button className="button">
          <span className="button-content">Add</span>
        </button>
      </form>

      <div
        style={{ background: `url(${wavyBg})` }}
        className="wavyBg wavyBg-Login"
      ></div>
    </div>
  );
}
