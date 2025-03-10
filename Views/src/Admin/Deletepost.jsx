import { useState , useEffect } from "react";
import {  useNavigate } from "react-router-dom"
import wavyBg from "../assets/wavy.png";
import { Helmet } from "react-helmet-async";


export default function Add() {
  const [passError, setpassError] = useState("")
  const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault();
    const post = new FormData(e.target).get("post")
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/DeletePost`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post })
      })
      const data = await response.json()
      if (!response.ok) {
        setpassError(data.message)
      }
      else {
        navigate("/Admin")
      }
    } catch (err) { console.log(err.message) }
  }

  async function handleGetting(){
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/deletePost` ,  {
        method: "GET",
        credentials: "include" })
      
        
      if(response.status === 403){
        navigate("/adminPermission")
      }

    }catch(err){console.log(err)}
  }

    useEffect(() => {handleGetting()})
  



  return (
    <div className="main">
                 <Helmet>
           <title>Delete a post | AY Blog App</title>
           <meta name="robots" content="noindex, nofollow" />
                 </Helmet>
      <section className="middleSection rs-middleSection">
        <h1 className="middleh1">Delete a post </h1>
        {!passError ? <h5 className="middleh5">Please provide a valid input to proceed. This action will permanently remove the post.</h5> :
          <h5 className="middleh5" style={{ color: "darkred" }}> {passError}</h5>}
        <form method="POST" className="addForm" onSubmit={handleSubmit} >
          <div className="input">
            <input className="SearchInput" type="text" name="post" placeholder="Enter post id or title..." />

          </div>

          <button className="button" ><span className="button-content">Delete</span></button>
        </form>
      </section>

      <div
        style={{ background: `url(${wavyBg})` }}
        className="wavyBg wavyBg-SignUp"
      ></div>
    </div>
  )

}