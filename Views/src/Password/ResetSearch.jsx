import wavyBg from "../assets/wavy.png";
import logo from "../../public/fullLogo.png";
import "./password.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ResetSearch() {
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  const [btnAnimationOut, setBtnAnimationOut] = useState({});
  const [h1AnimationOut, setH1AnimationOut] = useState({});
  const [h5AnimationOut, setH5AnimationOut] = useState({});

  function delayClick() {
    setBtnAnimationOut({ animation: "fadeOutDown  0.5s forwards " });
    setH1AnimationOut({ animation: "fadeOutDown 1.5s forwards " });
    setH5AnimationOut({ animation: "fadeOutDown 1.5s forwards " });
  }

  async function searchOtpFetch(e) {
    e.preventDefault();
    try {
      const emailSearch = new FormData(e.target).get("emailSearch");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/ResetSearchPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailSearch }),
        }
      );
      console.log(response)

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      } else {
        delayClick();
        setTimeout(() => {
          navigate("/otp");
        }, 500);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function checkUserOut() {
      const response = await fetch(
        "${import.meta.env.VITE_BACKEND_URL}/ResetSearchPassword",
        { method: "GET", credentials: "include" }
      );

      const data = await response.json();
      if (response.status === 403) {
        navigate("/LogoutPermission");
      }
    }
    checkUserOut();
  }, []);

  return (
    <div className="main">
      <Helmet>
        <title>Search for Your Account | AY Blog - Reset Your Password</title>
        <meta
          name="description"
          content="Forgot your password? Search for your AY Blog account and reset your password securely."
        />
        <meta
          name="keywords"
          content="reset password, search account, forgot password, account recovery, AY Blog, web development, coding tutorials, tech community"
        />
        <meta property="og:title" content="Search for Your Account | AY Blog" />
        <meta
          property="og:description"
          content="Enter your email to find your AY Blog account and reset your password securely."
        />
        <meta property="og:image" content={logo} />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="middleSection rs-middleSection">
        <h1 className="middleh1" style={h1AnimationOut}>
          Search For an account
        </h1>
        <h5 className="middleh5 rs-middleh5" style={h5AnimationOut}>
          {!Error ? (
            "search for your account by your email adress and reset the password by OTP process"
          ) : (
            <span style={{ color: "darkred" }}>{Error}</span>
          )}
        </h5>
        <form
          method="POST"
          className="addForm"
          style={btnAnimationOut}
          onSubmit={searchOtpFetch}
        >
          <div className="input">
            <input
              className="SearchInput"
              type="email"
              placeholder="Enter your email adress"
              name="emailSearch"
             
            />
          </div>
          <button className="button ">
            <span className="button-content">Search</span>
          </button>
        </form>
      </section>
      <div
        style={{ background: `url(${wavyBg})` }}
        className="wavyBg wavyBg-SignUp"
      ></div>
    </div>
  );
}
