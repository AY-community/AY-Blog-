import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState  } from "react";
import { Helmet } from "react-helmet-async";
import wavyBg from "../assets/wavy.png";
import logo from "../../public/fullLogo.png"


export default function Home() {
  const navigate = useNavigate();
  const [btnAnimationOut, setBtnAnimationOut] = useState({});
  const [h1AnimationOut, setH1AnimationOut] = useState({});
  const [h5AnimationOut, setH5AnimationOut] = useState({});

  function delayClick() {

    //FADEOUT ANIMATION

    setBtnAnimationOut({ animation: "fadeOutDown  0.5s forwards " });
    setH1AnimationOut({ animation: "fadeOutDown 1.5s forwards " });
    setH5AnimationOut({ animation: "fadeOutDown 1.5s forwards " });

    //DELAY THE NAVIGATION


  }

  async function checkToken(e){
    e.preventDefault()
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/home` , {
        method: "GET",
        headers: {
          "Content-Type": "application/json"} ,
          credentials: "include"
    });


      const data = await res.json();
      const destination = data.valid ? "/Blogs" : "/Login";



        setTimeout(() => {
          navigate(destination);
        }, 500);
    

      delayClick();

    } catch(err){console.error(err)}
  }











  return (
    <div className="main">
  
       <Helmet>
  <title>Get Started | AY Blog - Web Development & Tech Insights</title>
  <meta name="description" content="Get started with AY Blog and explore the latest web development trends, coding tutorials, and tech news." />
  <meta name="keywords" content="get started, web development, programming, coding tutorials, tech news, JavaScript, React, Node.js, AY Blog" />
  <meta property="og:title" content="Get Started with AY Blog" />
  <meta property="og:description" content="Join AY Blog to discover the latest web development trends, coding tutorials, and tech insights." />
  <meta property="og:image" content={logo} />
  <meta property="og:type" content="website" />
      </Helmet>

      <section className="middleSection">
        <h1 className="middleh1" style={h1AnimationOut}>
          Explore The Latest <br /> Updates With A&Y App
        </h1>

        <h5 className="middleh5" style={h5AnimationOut}>
          A&Y Blog App is your go-to platform for exploring and engaging with
          the latest programming tools. Stay updated, interact with a community
          of developers, and dive into cutting-edge tech trends!
        </h5>

       <button className="homeButton button " onClick={checkToken} style={btnAnimationOut}>
          <span className="button-content">Get started</span>
        </button>


      </section>

      <div style={{ background: `url(${wavyBg})` }} className="wavyBg"></div>
    </div>
  );
}
