import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


export default function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();

  async function verifyToken() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify/${token}`);
      const data = await response.json();

      if (response.ok) {
        navigate(`/addpassword/${token}`);
      } else {
        navigate(`/notfound`);
      }
    } catch (err) {
      console.log("Error verifying token:", err);
      navigate(`/notfound`);
    }
  }

  useEffect(() => {
    verifyToken();
  }, [token]);

  return(
    <section className="middleSection">
                 <Helmet>
                 <title>Verifying... | AY Blog App</title>

        <meta name="robots" content="noindex, nofollow" />
                 </Helmet>
    <h1  className="middleh1" >Verifying your token...</h1>
    </section>
  
)

}
