import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Box from "@mui/material/Box";
import logo from "../../public/Logo.png";
import Card from "./card";
import Modal from '@mui/material/Modal';
// import bg from "../assets/bg.avif"
import bg from "../assets/bg.png"
import bg2 from "../assets/bg2.jpg"
import { motion } from "framer-motion";


export default function Blogs() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showedData, setshowedData] = useState([]);
  const [count, setCount] = useState(9);
  const [liked, setLiked] = useState({});
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedCard, setSelectedCard] = useState({});





  const buttons = ["ai", "software", "hardware", "others"];

  function filterData(value) {

    if (value === "all") {
      setshowedData(data.slice(0, count));
    }
    else if (value === "others") {
      setshowedData(
        data.filter((item) => !buttons.includes(item.category))
      );
    }

    else {
      setshowedData(
        data.filter((item) => item.category === value)
      );
    }
  }

  const fadeUp = {
    initial: { opacity: 0, y: -40 },
    whileInView: {
      opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" ,  delay: 0.2  },
      viewport: { once: true }
    }
  }

  const fadeRight = {
    initial: { opacity: 0, x: 30 },
    whileInView: {
      opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" ,  delay: 0.2  },
      viewport: { once: true }
    }
  };

  const fadeLeft = {
    initial: { opacity: 0, x: -30 },
    whileInView: {
      opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut"  ,  delay: 0.2 },
    }
  };

  const fadeImageLeft = {
    initial: { opacity: 0, x: -30 },
    whileInView: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2,
        ease: "easeOut",
        delay: 0.4 
      }
    }
  };

  const navigate = useNavigate();
  async function handlefetch() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/Blogs`, {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        window.location.href = "/LoginPermission";
      } else {
        const fetchedData = await res.json();
        setData(fetchedData.reverse());
        setshowedData(fetchedData.slice(0, count));

      }

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }

  async function logout(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logout `, {
        method: "POST", 
        credentials: "include",
      });
      if (response.ok) {
        navigate("/Login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  function showMore() {
    setCount((count) => {
      count = count + 9;
    });

    setshowedData(data.slice(0, count));

  }

  useEffect(() => {
    handlefetch();
  }, []);

  useEffect(() => {
    async function getLike() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/like`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      const likeMap = data.likes.reduce((acc, item) => {
        acc[item.postId] = {
          liked: item.liked,
          likeNumber: item.likeNumber || 0,
        };
        return acc;
      }, {});

      setLiked(likeMap);


    }
    getLike();
  }, []);



  function skeletonTemplate() {
    return (
      <>
        <div className="loaderContainer">
          <div className="loader">
            <div className="blackhole">
              <div className="blackhole-circle"></div>
              <div className="blackhole-disc"></div>
            </div>

            <div className="curve">
              <svg viewBox="0 0 500 500">
                <path id="loading" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"></path>
                <text width="500" fill="red">
                  <textPath href="#loading"  >
                    loading...
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }

  const dataMapping = showedData.map((item) => {
    const createdAt = new Date(item.createdAt);
    return (
      <Card
        key={item._id}
        lminWidth="32.5%"
        mminWidth="49.5%"
        sminWidth="100%"
        title={item.title}
        date={`${createdAt.getFullYear()}/${(createdAt.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${createdAt
            .getDate()
            .toString()
            .padStart(2, "0")}`}
        image={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.picture}`}
        description={item.description}
        aspectRatio="15/9"
        fullDescription={item.description}
        postId={item._id}
        initiallikenumber={liked[item._id]?.likeNumber || "0"}
        liked={liked[item._id]?.liked ?? false}

        clickChage={() => {
          setSelectedCard(item);
          handleOpen()
        }}
        showingDesciption={false}

      />
    );
  });

  function fetchedTemplates() {
    return (
      <>
        <div className="mainBlog">
          <Helmet>
            <title>Main Page | AY Blog</title>
            <meta name="description" content="You need to log in to access AY Blog. Sign in now to explore the latest web development trends." />
          </Helmet>
          <header id="headerBlog">
            <img src={logo} alt="Logo" className="logoBlog" width="45px" />
            <nav>
              <ul id="navBlog">
                <li>
                  <span><a href="#introBlog">Home</a></span>
                </li>
                <li>
                  <span><a href="#blogSection">Blogs</a></span>
                </li>
                <li>
                  <span><a href="#creatorBlog">Creators</a></span>
                </li>
                <li>
                  <span><a href="/reviews">Reviews</a></span>
                </li>
              </ul>
            </nav>
            <form method="POST" onSubmit={logout}>
              <button className=" button buttonHeader">
                <span className="button-content">Log out</span>
              </button>
            </form>
          </header>



          <section id="introBlog" className="introBlog">
            <div className="p">
              <h1 className="middleh1">Welcome to <span>AY Blog</span> app, your tech hub</h1>
              <h5 className="middleh5">

                dive into the cutting-edge world of the latest tech trends and innovations—join us on an exciting journey as we collaborate to create something truly extraordinary!
              </h5>
            </div>

            <img src={bg} alt="haha" width="100%" />
          </section>


          <section id="creatorBlog" className="creatorBlog">
            <motion.h1 variants={fadeRight} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="middleh1">Meet the Mind Behind <span>AY Blog</span> idea</motion.h1>
            <motion.div variants={fadeRight} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="middleh5Container">
              <h5 className="middleh5">A passionate developer and ambitious college student, he thrives on innovation and problem-solving. With a curious mind and a love for technology, he's always exploring new ideas to build impactful solutions. Whether crafting sleek interfaces or diving into backend logic, he aims to create meaningful digital experiences.</h5>
              <button className="creatorButton button "><span className="button-content"><a href="https://github.com/AY-community">See more</a></span></button>
            </motion.div>
          </section>

          <section className="creatorBlog">
            <motion.div variants={fadeLeft} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="middleh5Container" style={{ alignContent: "center" }}>
              <h5 className="middleh5">we want to create new ideas and basics for the web design , express our vision to the world with our skill and devolop it a day by a day  and in the same time share the latest tech news so we can make you happy</h5>
            </motion.div>
            <motion.img variants={fadeImageLeft} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="middleImage" src={bg2} alt="bg2" width="40%" />
          </section>



          <motion.section variants={fadeUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} id="blogSection" className="blogSection">
            <div className="rowCards">
              <div className="categoryHeader"
              >
                <h1 className="middleh1" style={{}}> Latest <span>Blogs</span></h1>



                <div className="category" >
                  <div className="normalButtons" >
                    {buttons.map((btn, index) => (
                      <button
                        key={index}
                        onClick={() => { setActive(index), filterData(btn) }}
                        className={`button   buttonCategory ${active === index ? "active" : ""}`}    >
                        <span className="button-content">{btn}</span>
                      </button>
                    ))}
                    <div style={{ display: "flex", alignContent: "center", width: "10%" }}><button className={`allCategory ${active === 5 ? "active" : ""} `} onClick={() => { filterData("all"), setActive(5) }} style={{ border: "none", fontSize: "20px", background: "white" }}> All</button></div>

                  </div>

                </div>



















              </div>
              {dataMapping}
            </div>
          </motion.section>
          <div className="showMore">
            {" "}
            <button className="button" onClick={()=>{showMore() , setActive("") }}>
              <span className="button-content">Show More</span>
            </button>
          </div>

          <footer>
            <div className="footer-container">
              <div className="list">
                <ul>
                  <li><h4>AY Community</h4></li>
                  <li className="footerHeading">More web applications are coming under the name "AY," focusing on innovation, quality, and user-friendly solutions.</li>
                </ul>
              </div>

              <div className="list list1 ">
                <ul className="uk-list">
                  <li className="uk-margin-medium-bottom@s">
                    <h4>Learn More</h4>
                  </li>
                  <li>
                    <a href="" uk-icon="chevron-right"></a>
                    <span>About</span>
                  </li>
                  <li>
                    <a href="" uk-icon="chevron-right"></a>
                    <span>Privacy Policy</span>
                  </li>
                  <li>
                    <a href="" uk-icon="chevron-right"></a>
                    <span>projects</span>
                  </li>
                </ul>
              </div>

              <div className=" list list2">
                <ul className="uk-list">
                  <li className="uk-margin-medium-bottom@s">
                    <h4>Contact Us</h4>
                  </li>
                  <li>
                    <a href="" uk-icon="chevron-right"></a>
                    <span>Tele:213 ** ** **</span>
                  </li>
                  <li>
                    <a href="" uk-icon="chevron-right"></a>
                    <span>Social Media</span>
                  </li>
                  <li>
                    <a href="" uk-icon="chevron-right"></a>
                    <span onClick={() => navigate("/reviews")}>App Reviews</span>
                  </li>
                </ul>
              </div>

              <div className="list list3 ">
                <ul className="uk-list">
                  <li className="uk-margin-medium-bottom@s">
                    <h4>Social Media</h4>
                  </li>

                  <li>
                    <span uk-icon="instagram">
                      <a href="https://www.instagram.com/ay_community?igsh=czEyYXN3aXpxdzQ4"> Instagram</a>
                    </span>{" "}

                  </li>

                  <li>
                    {" "}

                    <span uk-icon="facebook">
                     <a href="https://www.facebook.com/profile.php?id=100080151895691"> Facebook</a>
                    </span>{" "}



                  </li>
                  <li>
                    <span uk-icon="twitter">
                     <a href="https://github.com/AY-community">Github</a> 
                    </span>{" "}

                  </li>
                </ul>
              </div>

              <br />
              <br />
            </div>
            <br />
            <hr />
            <br />
            <div className="right ">
              <strong>
                <p className="right-p">
                  {new Date().getFullYear()} AY| all rights reserved
                </p>
              </strong>{" "}
            </div>
          </footer>
        </div>
      </>
    );
  }


  return (
    <>

      <Modal 
       sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", overflowY: "auto" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
 
   <>
        <Card sx={{ position: "absolute", top: "50%" }}
          key="73639"
          lminWidth="50%"
          mminWidth="89.5%"
          sminWidth="100%"
          title={selectedCard?.title || "Loading..."}
          date='ss'
          image={`${import.meta.env.VITE_BACKEND_URL}/uploads/${selectedCard?.picture}` || "Loading..."}
          description={selectedCard?.description || "Loading..."}
          aspectRatio="16/9"
          postId="{item._id}"
          showingDesciption={true}
          
        />
     </>
      </Modal>

      {loading === true ? skeletonTemplate() : fetchedTemplates()}

    </>
  );
}
