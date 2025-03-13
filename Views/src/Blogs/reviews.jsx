import wavyBg from "../assets/wavy.png";
import"./Blogs.css"
import {useNavigate} from "react-router-dom"
import {useState, useEffect } from "react"; 
import { Helmet} from "react-helmet-async";
import logo from "../../public/fullLogo.png"



export default function ResetSearch(){
     const navigate = useNavigate()
     const [review, setReview] = useState("");
     const [reviewError, setReviewError] = useState();
     const [btnAnimationOut, setBtnAnimationOut] = useState({});
     const [h1AnimationOut, setH1AnimationOut] = useState({});
     const [h5AnimationOut, setH5AnimationOut] = useState({});

     async function checkUser(){
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`   ,{
            method:"GET",
            credentials:"include"
        })
        const data = await response.json()

       if(response.status === 401){
           navigate("/LoginPermission")
     }

    }


        //FADEOUT ANIMATION
        function delayClick() {
        setBtnAnimationOut({ animation: "fadeOutDown  0.5s forwards " });
        setH1AnimationOut({ animation: "fadeOutDown 1.5s forwards " });
        setH5AnimationOut({ animation: "fadeOutDown 1.5s forwards " });
        }

        async function sendReview(event) {
        event.preventDefault();

        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ review }),
            credentials: "include",
          });
     
          const data = await response.json()
          if (response.ok) { 
            delayClick()
            setTimeout( ()=>{    
            navigate("/Blogs")} , 500)
          } else {
            setReviewError(data.message)
          }
        } catch (err) {
          console.log("Error sending review:", err);
        }
      }

    useEffect(() => {checkUser()}, [])




return(
    <div className="main">
      <Helmet>
  <title>Add a Review | AY Blog - Share Your Experience</title>
  <meta name="description" content="Share your thoughts and feedback on AY Blog. Help us improve by adding a review about your experience with our content and platform." />
  <meta name="keywords" content="add review, user feedback, share experience, AY Blog reviews, testimonials, web development blog, coding tutorials, tech insights, developer community" />
  <meta property="og:title" content="Add a Review | AY Blog" />
  <meta property="og:description" content="Write a review about AY Blog and share your experience with our web development tutorials, coding guides, and tech insights." />
  <meta property="og:image" content={logo} />
  <meta property="og:type" content="website" />
</Helmet>

         <section className="middleSection rs-middleSection">
        <h1 className="middleh1" style={h1AnimationOut}>Add a review</h1> 
        <h5 className="middleh5 rs-middleh5" style={h5AnimationOut}>
  {reviewError ? (<span style={{ color: "darkred" }}>{reviewError}</span>) : ("Describe your experience with our app and give us general feedback to improve it for you." )}</h5>
      
        <form method="POST" className="addForm" onSubmit={sendReview}  style={btnAnimationOut}>
        <div className="input">
        <input className="SearchInput" type="text"      value={review} onChange={(e) => setReview(e.target.value)} placeholder="Enter your review" name="emailSearch" />
        </div>
        <button className="button"><span className="button-content">Send</span></button>
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
