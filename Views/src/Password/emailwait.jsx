import wavyBg from "../assets/wavy.png";
import "./password.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ResetSearch() {
  const navigate = useNavigate();
  const [btnAnimationOut, setBtnAnimationOut] = useState({});
  const [h1AnimationOut, setH1AnimationOut] = useState({});
  const [h5AnimationOut, setH5AnimationOut] = useState({});

  function delayClick() {
    setBtnAnimationOut({ animation: "fadeOutDown  0.5s forwards " });
    setH1AnimationOut({ animation: "fadeOutDown 1.5s forwards " });
    setH5AnimationOut({ animation: "fadeOutDown 1.5s forwards " });
  }

  return (
    <div className="main">
      <Helmet>
        <title>Email verification | AY Blog App</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="middleSection rs-middleSection">
        <h1 className="middleh1" style={h1AnimationOut}>
          Email Confirmation{" "}
        </h1>
        <h5 className="middleh5" style={h5AnimationOut}>
          confirm your email by clicking the link we send you and create your
          password{" "}
        </h5>

        <button
          className="button"
          style={btnAnimationOut}
          onClick={() => {
            delayClick();
            setTimeout(() => {
              navigate(-1);
            }, 500);
          }}
        >
          <span className="button-content">Go Back</span>
        </button>
      </section>

      <div
        style={{ background: `url(${wavyBg})` }}
        className="wavyBg wavyBg-SignUp"
      ></div>
    </div>
  );
}
