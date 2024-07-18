import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages & components
import Home from './Pages/Home';
import Search from './Pages/Search';
import Navbar from './components/navbar';
import Contact from './Pages/Contact';
import Blog from './Pages/Blog';
import AboutUs from './Pages/AboutUs';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import PasswordReset from "./Pages/PasswordReset";
import { UserProvider } from './contexts/user';


function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <div className='pages'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />  {}
              <Route path="/password-reset" element={<PasswordReset />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
