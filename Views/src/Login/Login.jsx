import "./Login.css";
import wavyBg from "../assets/wavy.png";
import logo from "../../public/Logo.png";
import fullLogo from "../../public/fullLogo.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const navigate = useNavigate();
  const [FormAnimationOut, setFormAnimationOut] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const [Error, setError] = useState({ pmessage: "", emessage: "" });

  //LOGIN FETCH FUNCTION
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return setError({
          pmessage: data.pmessage || "",
          emessage: data.emessage || "",
        });
      }

      // Redirect to dashboard
      navigate("/Blogs");
    } catch (err) {
      return setError({
        message: " something went wrong",
      });
    }
  }

  //CHECK USER 
  useEffect(() => {
    async function checkUserOut() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (response.status === 403) {

        navigate("/LogoutPermission");
      }
    }
    checkUserOut();
  }, []);

  // FADEOUT ANIMATION BEFORE NAVIGATE

  function delayClick(e) {
    e.preventDefault();

   //FADEOUT ANIMATION

    setFormAnimationOut({ animation: "fadeOutDown 0.5s forwards " });

    //DELAY THE NAVIGATION

    setTimeout(() => {
      navigate("/SignUp");
    }, 500);
  }
  // BUTTON TO SHOW THE PASSWORD

  function eyeToggle() {
    setPasswordType(passwordType === "password" ? "text" : "password");
  }

  return (
    <div className="main">
      <Helmet>
        <title>Login | AY Blog</title>
        <meta
          name="description"
          content="Log in to AY Blog to access exclusive web development insights and tutorials."
        />
        <meta
          name="keywords"
          content="login, AY Blog, web development, programming, coding tutorials, tech news, developer community"
        />
        <meta property="og:title" content="Log in to AY Blog" />
        <meta
          property="og:description"
          content="Join AY Blog to stay updated with the latest web development trends and tips."
        />
        <meta property="og:image" content={fullLogo} />
        <meta property="og:type" content="website" />
      </Helmet>

      <form
        className="userForm"
        style={FormAnimationOut}
        onSubmit={handleLogin}
      >
        <div className="formHeader">
          <img src={logo} alt="logo" width="15%" />
          <h1>Log in</h1>
          <h6>
            Dont have account? <span onClick={delayClick}>Sign up</span>
          </h6>
        </div>

        <button
          className="socialmediaButton"
          type="button"
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/facebook`;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="26"
            height="26"
            viewBox="0 0 48 48"
          >
            <path
              fill="#039be5"
              d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
            ></path>
            <path
              fill="#fff"
              d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
            ></path>
          </svg>
          Log in with Facebook
        </button>
        <button
          className="socialmediaButton"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="22"
            height="22"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Log in with Google
        </button>
        <div className="inputDiv">
          <label htmlFor="email">
            {" "}
            <span>Your Email</span> <span>{Error.emessage}</span>
          </label>
          <div className="input ">
            <input type="email" name="email" />
          </div>
        </div>

        <div className="inputDiv">
          <label htmlFor="password">
            <span>Your Password</span> <span>{Error.pmessage}</span>
          </label>
          <div className="input">
            {" "}
            <input type={passwordType} name="password" />{" "}
            <span className="eyeToggle" onClick={eyeToggle}>
              {passwordType === "password" ? <Eye /> : <EyeOff />}
            </span>
          </div>
        </div>

        <div className="formFooter">
          <Link className="link" to="/ResetSearchPassword">
            forget your password ?
          </Link>{" "}
        </div>
        <button className="button">
          <span className="button-content">Log in</span>
        </button>
      </form>

      <div
        style={{ background: `url(${wavyBg})` }}
        className="wavyBg wavyBg-Login"
      ></div>
    </div>
  );
}
