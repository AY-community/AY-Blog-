import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import wavyBg from "../assets/wavy.png";
import { Helmet } from "react-helmet-async";

export default function Add() {
  const [passwordType, setPasswordType] = useState("password");
  const [passError, setpassError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  function eyeToggle() {
    setPasswordType(passwordType === "password" ? "text" : "password");
  }

  async function postFetch(e) {
    e.preventDefault();
    setpassError("");
    const password = new FormData(e.target).get("password");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/addpassword/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setpassError(data.error);
      }
       else if(response.ok) {
        navigate(`/Login`);
      }



    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="main">
      <Helmet>
        <title> Create your password | AY Blog App</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="middleSection rs-middleSection">
        <h1 className="middleh1">create your password </h1>
        {!passError ? (
          <h5 className="middleh5">
            Please create a strong and secure password containing 6 to 18
            characters, including letters and numbers.
          </h5>
        ) : (
          <h5 className="middleh5" style={{ color: "darkred" }}>
            {" "}
            {passError}
          </h5>
        )}
        <form method="POST" className="addForm" onSubmit={postFetch}>
          <div className="input">
            <input
              className="SearchInput"
              type={passwordType}
              name="password"
              placeholder="Enter your password"
               maxLength="18"
            />
            <span className="eyeToggle eyeToggleAdd" onClick={eyeToggle}>
              {passwordType === "password" ? <Eye /> : <EyeOff />}
            </span>
          </div>

          <button className="button">
            <span className="button-content">Add</span>
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
