// import { Link } from "react-router-dom";
// import { FaRegHeart } from "react-icons/fa";
// import { RxPerson } from "react-icons/rx";
// import { BsSearch } from "react-icons/bs";
// import shopfulLogo from "./pictures/shopful.png";

// const Navbar = () => {
//   return (
//     <header>
//       <div className="container">
//         <div className="navbar_left">
//           <Link to="/">
//             <img className="logo-image" src={shopfulLogo} alt="Shopful" />
//           </Link>
//           <a href="/">Home</a>
//           <a href="/">Shop</a>
//           <a href="/AboutUs">About Us</a>
//           <a href="/Blog">Blog</a>
//           <a href="/Contact">Contact Us</a>
//         </div>
//         <div className="navbar_right">
//           <a href="/#">Cart</a>
//           <a href="/#">
//             <FaRegHeart />
//           </a>
//           <a href="/#">
//             <RxPerson />
//           </a>
//           <a href="/#">
//             Search Bar
//             <BsSearch />
//           </a>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


// import React from "react";
// import { Link } from "react-router-dom";
// import { FaRegHeart } from "react-icons/fa";
// import { RxPerson } from "react-icons/rx";
// import { BsSearch } from "react-icons/bs";
// import shopfulLogo from "./pictures/shopful.png";

// const Navbar = () => {
//   return (
//     <header style={{ backgroundColor: "#f8f8f8", padding: "10px 0" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           maxWidth: "1200px",
//           margin: "0 auto",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <Link to="/">
//             <img
//               className="logo-image"
//               src={shopfulLogo}
//               alt="Shopful"
//               style={{ marginRight: "20px" }}
//             />
//           </Link>
//           <nav style={{ display: "flex", gap: "20px" }}>
//             <Link to="/" style={linkStyle}>
//               Home
//             </Link>
//             <Link to="/shop" style={linkStyle}>
//               Shop
//             </Link>
//             <Link to="/about" style={linkStyle}>
//               About Us
//             </Link>
//             <Link to="/blog" style={linkStyle}>
//               Blog
//             </Link>
//             <Link to="/contact" style={linkStyle}>
//               Contact Us
//             </Link>
//           </nav>
//         </div>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <a href="/cart" style={linkStyle}>
//             Cart
//           </a>
//           <a href="/wishlist" style={linkStyle}>
//             <FaRegHeart />
//           </a>
//           <a href="/profile" style={linkStyle}>
//             <RxPerson />
//           </a>
//           <div style={{ display: "flex" }}>
//             <input
//               type="text"
//               placeholder="Search"
//               style={{
//                 padding: "5px",
//                 marginRight: "5px",
//                 border: "1px solid #ccc",
//                 borderRadius: "5px",
//               }}
//             />
//             <BsSearch style={{ cursor: "pointer", marginTop: "15px" }} />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// const linkStyle = {
//   textDecoration: "none",
//   color: "#333",
//   fontWeight: "bold",
//   marginRight: "20px",
// };
//export 
// export default Navbar;


import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { RxPerson } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import { Popover, Typography, Button } from "@mui/material";
import { UserContext } from "../contexts/user";
import shopfulLogo from "./pictures/shopful.png";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logOutUser } = useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logOutUser();
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/">
          <img
            className="logo-image"
            src={shopfulLogo}
            alt="Shopful"
            style={logoStyle}
          />
        </Link>
        <nav style={navStyle}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} style={linkStyle}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div style={rightContainerStyle}>
          <Link to="/cart" style={linkStyle}>
            Cart
          </Link>
          <Link to="/wishlist" style={linkStyle}>
            <FaRegHeart />
          </Link>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            style={buttonStyle}
          >
            <RxPerson />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}>
              {user ? (
                <>
                  <Typography>Welcome, {user.profile.email}</Typography>
                  <Button 
                    onClick={handleLogout} 
                    variant="contained" 
                    color="secondary" 
                    style={{ marginTop: "1rem" }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" style={popoverLinkStyle}>Login</Link>
                  <br />
                  <Link to="/signup" style={popoverLinkStyle}>Sign Up</Link>
                </>
              )}
            </Typography>
          </Popover>
          <div style={searchContainerStyle}>
            <input
              type="text"
              placeholder="Search"
              style={searchInputStyle}
            />
            <BsSearch style={searchIconStyle} />
          </div>
        </div>
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#f8f8f8",
  padding: "15px 0",
  color: "#333",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
};

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1200px",
  margin: "0 auto"
};

const logoStyle = {
  width: "100px",
  height: "auto"
};

const navStyle = {
  display: "flex",
  gap: "20px"
};

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontSize: "16px"
};

const rightContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const buttonStyle = {
  backgroundColor: "transparent",
  color: "#333",
  boxShadow: "none"
};

const popoverLinkStyle = {
  textDecoration: "none",
  color: "#333",
  fontSize: "16px",
  display: "block" 
};

const searchContainerStyle = {
  display: "flex"
};

const searchInputStyle = {
  padding: "8px",
  marginRight: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px"
};

const searchIconStyle = {
  fontSize: "20px",
  cursor: "pointer",
  marginTop: "4px" 
};

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/aboutus", label: "About Us" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact Us" },
  { to: "/saved-items", label: "Saved Items" } 
];

export default Navbar;

