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


import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { RxPerson } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import shopfulLogo from "./pictures/shopful.png";
import maplogo from "./pictures/maplogo.png";

const Navbar = () => {
  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/">
          <img
            className="map-logo"
            src={maplogo}
            alt="maplogo"
            style={maplogoStyle}
            />
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
          <NavLink href="/cart" label="Cart" />
          <NavLink href="/wishlist" label={<FaRegHeart />} />
          <NavLink href="/profile" label={<RxPerson />} />
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
  backgroundColor: "#A9F2D0",
  padding: "15px 0",
  color: "#333",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
};

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1200px",
  margin: "0 auto",
};

const logoStyle = {
  width: "100px",
  height: "auto",
};

const maplogoStyle = {
  width: "40px",
  height: "auto",
}

const navStyle = {
  display: "flex",
  gap: "20px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontSize: "16px",
};

const rightContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const searchContainerStyle = {
  display: "flex",
};

const searchInputStyle = {
  padding: "8px",
  marginRight: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
};

const searchIconStyle = {
  fontSize: "20px",
  cursor: "pointer",
  marginTop: "15px"
};

const NavLink = ({ href, label }) => (
  <a href={href} style={linkStyle}>
    {label}
  </a>
);

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact Us" },
];

export default Navbar;
