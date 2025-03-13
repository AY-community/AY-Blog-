import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import CropFreeSharpIcon   from '@mui/icons-material/CropFreeSharp';
import imageD from "../assets/cardbg.jpg"
import { createTheme, ThemeProvider } from "@mui/material/styles";




const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,      // Default
      sm: 650,    // Custom
      md: 1000,    // Custom
      lg: 1200,   // Custom
      xl: 1500,   // Custom
    },
  },
});


// Expand Button Styling
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function BlogCard({
  title,
  date,
  image,
  description,
  aspectRatio,
  fullDescription,
  sminWidth,
  mminWidth,
  lminWidth,
  maxHeight,
  postId,
  initiallikenumber,
  liked,
  clickChage,
  showingDesciption
}) {
  
  const [likenumber, setLikeNumber] = useState(initiallikenumber);
  const [isliked, setIsliked] = useState(liked);

 

  async function toggleLike() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
      credentials: "include",
    });

    const data = await response.json();

    setIsliked(data.liked);
    setLikeNumber(data.likeNumber ? data.likeNumber : 0);
  }



  return (
    <Card
      sx={{
      background:`url(${imageD})`,

      backgroundSize:"cover",

        width: { xs: sminWidth, sm: mminWidth, md: lminWidth },
        maxHeight: maxHeight,
        marginBottom: "15px",
        
      }}
    >

      <CardMedia
        component="img"
        sx={{ aspectRatio: aspectRatio, objectFit: "cover" }}
        height="auto"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{color:"black" , fontWeight:"600" ,  fontSize: {
      xs: "12px",  sm: "8.5px", md: "8.8px",lg: "12.5px" , xl:"16px" } , fontFamily:"var(--font-primary)" , marginBottom:"10px" , marginTop:"10px"}}>
          {title}
        </Typography>
      </CardContent>
      {showingDesciption ? 
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{color:"black" , fontWeight:"600" , fontSize:"13px" , fontFamily:"var(--font-primary)" , marginBottom:"10px" , marginTop:"10px"}}>
          {description}
        </Typography>
      </CardContent>  :  null}
      {!showingDesciption ? 
      <CardActions disableSpacing >
        <IconButton onClick={toggleLike}>
          {!isliked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"
                fill="black"
                stroke="none"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
                fill="red"
              />
            </svg>
          )}
        </IconButton>
        <p style={{fontFamily:"Pontano Sans"}}>{likenumber}</p>

        <IconButton
          onClick={() => navigator.clipboard.writeText(fullDescription)}
        >
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z"
              fillRule="nonzero"
            />
          </svg>
        </IconButton>
        

       <IconButton sx={{ marginLeft: "auto" }}  onClick={clickChage}>
    <CropFreeSharpIcon sx={{color:"black"}} />
  </IconButton>
      </CardActions> : null}

    </Card>
  );
}

export default BlogCard;
