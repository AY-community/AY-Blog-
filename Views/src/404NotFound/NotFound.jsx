import "./NotFound.css";
import wavyBg from "../assets/wavy.png";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


export default function NotFound() {
  const Navigate = useNavigate();

  function windowBack() {
    Navigate("/");
  }

  return (
    <div className="main">
           <Helmet>
           <title> 404 Not found | AY Blog App</title>
          <meta name="robots" content="noindex, nofollow" />
          </Helmet>
      <section className="middleSection">
        <h1 className="middleh1">
          <span className="NotFoundSpan">404</span> NOT FOUND
        </h1>

        <h5 className="middleh5">
          The page you are looking for might have been removed , never existed
          or is temporarily unavailable
        </h5>

        <button className="button" onClick={windowBack}>
          <span className="button-content">Go Home</span>
        </button>
      </section>
      <div style={{ background: `url(${wavyBg})` }} className="wavyBg "></div>
    </div>
  );
}
